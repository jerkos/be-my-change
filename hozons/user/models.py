# -*- coding: utf-8 -*-
"""User models."""
import datetime as dt

from flask_login import UserMixin

from hozons.database import Column, Model, SurrogatePK, db, reference_col, relationship
from hozons.extensions import bcrypt


class Role(SurrogatePK, Model):
    """A role for a user."""

    __tablename__ = 'roles'
    name = Column(db.String(80), unique=True, nullable=False)
    user_id = reference_col('users', nullable=True)
    user = relationship('User', backref='roles')

    def __init__(self, name, **kwargs):
        """Create instance."""
        db.Model.__init__(self, name=name, **kwargs)

    def __repr__(self):
        """Represent instance as a unique string."""
        return '<Role({name})>'.format(name=self.name)


class User(UserMixin, SurrogatePK, Model):
    """A user of the app."""

    __tablename__ = 'users'
    username = Column(db.String(80), unique=True, nullable=False)
    email = Column(db.String(80), unique=True, nullable=False)
    #: The hashed password
    password = Column(db.Binary(128), nullable=True)
    created_at = Column(db.DateTime, nullable=False, default=dt.datetime.utcnow)
    first_name = Column(db.String(30), nullable=True)
    last_name = Column(db.String(30), nullable=True)
    active = Column(db.Boolean(), default=False)
    is_admin = Column(db.Boolean(), default=False)

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


import enum
class TemporalKind(enum.Enum):
    daily = 'daily'
    monthly = 'monthly'
    yearly = 'yearly'


class Action(SurrogatePK, Model):
    __tablename__ = 'actions'
    title = Column(db.String(200), nullable=False)
    description = Column(db.Text, nullable=False)
    temporal_kind = Column('value', db.Enum(TemporalKind), nullable=False, default=TemporalKind.daily)

    def __init__(self, title, description, temporal_kind=TemporalKind.daily):
        self.title = title
        self.description = description
        self.temporal_kind = temporal_kind
    
    def __repr__(self):
        return '<Action {title}>'.format(title=self.title)


class UserAction(SurrogatePK, Model):
    __tablename__ = 'user_actions'
    user_id = reference_col('users', nullable=False)
    user = relationship('User', backref='user_actions')
    action_id = reference_col('actions', nullable=False)
    action = relationship('Action', backref='user_actions')
    created_at = Column(db.DateTime, nullable=False, default=dt.datetime.utcnow)
    start_date = Column(db.DateTime, nullable=False)
    end_date = Column(db.DateTime, nullable=False)
    nb_succeed = Column(db.Integer, nullable=False, default=0)


class Followings(SurrogatePK, Model):
    __tablename__ = 'followings'
    followed_user_id = reference_col('users', nullable=False)
    followed_users = relationship('User', foreign_keys=[followed_user_id], backref='following_users')
    following_user_id = reference_col('users', nullable=False)
    following_users = relationship('User', foreign_keys=[following_user_id], backref='followed_users')
    created_at = Column(db.DateTime, nullable=False, default=dt.datetime.utcnow)


class Ressource(SurrogatePK, Model):
    __tablename__ = 'ressources'
    user_id = reference_col('users', nullable=False)
    user = relationship('User', backref='ressources')
    action_id = reference_col('actions', nullable=False)
    action = relationship('Action', backref='ressources')
    content = Column(db.Text, nullable=True)

