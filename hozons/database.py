# -*- coding: utf-8 -*-
"""Database module, including the SQLAlchemy database object and DB-related utilities."""
import collections
import json

from .compat import basestring
from .extensions import db

# Alias common SQLAlchemy names
Column = db.Column
relationship = db.relationship


class CRUDMixin(object):
    """Mixin that adds convenience methods for CRUD (create, read, update, delete) operations."""

    @classmethod
    def create(cls, **kwargs):
        """Create a new record and save it the database."""
        instance = cls(**kwargs)
        return instance.save()

    def update(self, commit=True, **kwargs):
        """Update specific fields of a record."""
        for attr, value in kwargs.items():
            setattr(self, attr, value)
        return commit and self.save() or self

    def save(self, commit=True):
        """Save the record."""
        db.session.add(self)
        if commit:
            db.session.commit()
        return self

    def delete(self, commit=True):
        """Remove the record from the database."""
        db.session.delete(self)
        return commit and db.session.commit()


class Model(CRUDMixin, db.Model):
    """Base model class that includes CRUD convenience methods."""

    __abstract__ = True


# From Mike Bayer's "Building the app" talk
# https://speakerdeck.com/zzzeek/building-the-app
class SurrogatePK(object):
    """A mixin that adds a surrogate integer 'primary key' column named ``id`` to any declarative-mapped class."""

    __table_args__ = {'extend_existing': True}

    id = db.Column(db.Integer, primary_key=True)

    @classmethod
    def get_by_id(cls, record_id):
        """Get record by ID."""
        if any(
                (isinstance(record_id, basestring) and record_id.isdigit(),
                 isinstance(record_id, (int, float))),
        ):
            return cls.query.get(int(record_id))
        return None


def reference_col(tablename, nullable=False, pk_name='id', **kwargs):
    """Column that adds primary key foreign key reference.

    Usage: ::

        category_id = reference_col('category')
        category = relationship('Category', backref='categories')
    """
    return db.Column(
        db.ForeignKey('{0}.{1}'.format(tablename, pk_name)),
        nullable=nullable, **kwargs)


class JsonSerializerMixin(object):

    MAPPER = {
        'datetime': lambda x: x.isoformat(),
        'date': lambda x: x.isoformat()
    }

    def _to_dict(self):
        result = {}

        # fetch simple columns
        for col in self.class.__table__.columns:
            value = getattr(self, col.name)
            if col.type in MAPPER.keys() and value is not None:
                try:
                    result[col.name] = convert[col.type](value)
                except:
                    result[col.name] = "Error:  Failed to covert using ", str(MAPPER[col.type])
            else:
                result[col.name] = value
        
        # try to fetch relationships
        referred_classes = [r.mapper.class_ for r in inspect(self).relationships]
        for attr_name, value in self.__dir__.items():
            if isinstance(value, Collections.Iterable):
                for item in value:
                    if isinstance(item, db.Model):
                        result.update(to_json(item, item.class))
            else:
                if isinstance(value, db.Model):
                    result.update(to_json(value, value.class))
        return result

    def to_json(self):
        return json.dumps(self._to_dict())
