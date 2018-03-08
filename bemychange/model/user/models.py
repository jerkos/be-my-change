# -*- coding: utf-8 -*-
"""User models."""
import datetime as dt

from flask_login import UserMixin
from sqlalchemy import text

from bemychange.database import Column, Model, SurrogatePK, db, reference_col, relationship, JsonSerializerMixin
from bemychange.extensions import bcrypt


class Role(SurrogatePK, Model):
    """A role for a user."""

    __tablename__ = 'roles'
    name = Column(db.String(80), unique=True, nullable=False)
    user_id = reference_col('users', nullable=True)
    user = relationship('models.User', backref='roles')

    def __init__(self, name, **kwargs):
        """Create instance."""
        db.Model.__init__(self, name=name, **kwargs)

    def __repr__(self):
        """Represent instance as a unique string."""
        return '<Role({name})>'.format(name=self.name)


class User(JsonSerializerMixin, UserMixin, SurrogatePK, Model):
    """A user of the app."""

    __tablename__ = 'users'
    RELATIONSHIPS_TO_DICT = True

    username = Column(db.String(80), unique=True, nullable=False)
    email = Column(db.String(80), unique=True, nullable=False)
    #: The hashed password
    password = Column(db.Binary(128), nullable=True)
    created_at = Column(db.DateTime, nullable=False, default=dt.datetime.utcnow)
    first_name = Column(db.String(30), nullable=True)
    last_name = Column(db.String(30), nullable=True)

    has_image = Column(db.Boolean(), default=False)

    active = Column(db.Boolean(), default=False)
    is_admin = Column(db.Boolean(), default=False)

    points = Column(db.Integer, default=0)

    def __init__(self, username, email, password=None, **kwargs):
        """Create instance."""
        db.Model.__init__(self, username=username, email=email, **kwargs)
        if password:
            self.set_password(password)
        else:
            self.password = None

    def set_password(self, password):
        """Set password."""
        self.password = bcrypt.generate_password_hash(password)

    def check_password(self, value):
        """Check password."""
        return bcrypt.check_password_hash(self.password, value)

    @property
    def full_name(self):
        """Full user name."""
        return '{0} {1}'.format(self.first_name, self.last_name)

    def __repr__(self):
        """Represent instance as a unique string."""
        return '<User({username!r})>'.format(username=self.username)
    
    def user_actions(self, requested_date):
        rows = db.engine.execute(text(
            'SELECT json_agg(_) AS result FROM ('
            '   SELECT *,'
            '   (SELECT row_to_json(_) FROM ('
            '       SELECT * FROM actions'
            '        WHERE actions.id = user_actions.action_id'
            '   )_) AS action'
            ' FROM user_actions'
            ' WHERE :requested_date BETWEEN'
            ' user_actions.start_date AND user_actions.end_date'
            ' AND user_actions.user_id = :user_id'
            ' )_'),
            **{'requested_date': requested_date, 'user_id': self.get_id()})

        return rows.first()['result'] or []
