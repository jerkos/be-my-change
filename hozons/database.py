# -*- coding: utf-8 -*-
"""Database module, including the SQLAlchemy database object and DB-related utilities."""
import collections
import json
from datetime import datetime
from uuid import uuid4

from sqlalchemy.ext.declarative import DeclarativeMeta

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
    """mixin for handling json serialization"""
    RELATIONSHIPS_TO_DICT = False

    def __iter__(self):
        return self.to_dict().iteritems()

    @staticmethod
    def _get_val(x):
        if isinstance(x, datetime):
            return x.isoformat()
        return x
    
    def to_dict(self, rel=None, backref=None, exclude=()):
        if rel is None:
            rel = self.RELATIONSHIPS_TO_DICT
        res = {column.key: self._get_val(getattr(self, attr))
               for attr, column in self.__mapper__.c.items() 
               if column.key not in exclude}
        if rel:
            for attr, relation in self.__mapper__.relationships.items():
                # Avoid recursive loop between to tables.
                if backref == relation.table:
                    continue
                value = getattr(self, attr)
                if value is None:
                    res[relation.key] = None
                elif isinstance(value.__class__, DeclarativeMeta):
                    res[relation.key] = value.to_dict(backref=self.__table__, exclude=exclude)
                else:
                    res[relation.key] = [i.to_dict(backref=self.__table__, exclude=exclude)
                                         for i in value]
        return res

    def to_json(self, rel=None, exclude=None):
        """convert model to json"""
        if rel is None:
            rel = self.RELATIONSHIPS_TO_DICT
        return json.dumps(self.to_dict(rel, exclude=exclude))

    @staticmethod
    def arr_to_json(arr, rel=None, exclude=None):
        """convert an array to json"""
        return json.dumps([obj.to_dict(rel=rel, exclude=exclude) for obj in arr])
