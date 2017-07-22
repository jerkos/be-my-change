# -*- coding: utf-8 -*-
"""User models."""
import datetime as dt

from flask_login import UserMixin

from hozons.database import Column, Model, SurrogatePK, db, reference_col, relationship, JsonSerializerMixin
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


class User(JsonSerializerMixin, UserMixin, SurrogatePK, Model):
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

    points_pers = Column(db.Integer, default=0)
    points_env = Column(db.Integer, default=0)
    points_rel = Column(db.Integer, default=0)

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


class Action(JsonSerializerMixin, SurrogatePK, Model):
    __tablename__ = 'actions'
    RELATIONSHIPS_TO_DICT = True

    title = Column(db.String(200), nullable=False)
    description = Column(db.Text, nullable=False)
    initial_nb_days = Column(db.Integer, default=1)

    is_personal_action = Column(db.Boolean, default=True)
    public = Column(db.Boolean, default=True)

    created_at = Column(db.DateTime, default=dt.datetime.utcnow)
    start_date = Column(db.DateTime)
    end_date = Column(db.DateTime)
    
    creator_user_id = reference_col('users', nullable=False)
    creator = relationship('User', backref='createdActions')

    def __init__(self, creator_id, title, description, initial_nb_days=1):
        db.Model.__init__(self, creator_id = creator_id, title=title, description=description, initial_nb_days=1)
    
    def __repr__(self):
        return '<Action {title}>'.format(title=self.title)


class UserAction(JsonSerializerMixin, SurrogatePK, Model):
    __tablename__ = 'user_actions'
    user_id = reference_col('users', nullable=False)
    user = relationship('User', backref='user_actions')

    action_id = reference_col('actions', nullable=False)
    action = relationship('Action', backref='user_actions')
    
    created_at = Column(db.DateTime, nullable=False, default=dt.datetime.utcnow)
    start_date = Column(db.DateTime, nullable=False)
    end_date = Column(db.DateTime, nullable=False)
    
    last_succeed = Column(db.DateTime)
    nb_succeed = Column(db.Integer, nullable=False, default=0)

    def __init__(self, user_id, action_id, start_date, end_date):
        self.user_id = user_id
        self.action_id = action_id
        self.start_date = start_date
        self.end_date = end_date

    def has_been_realised_today():
        if self.last_succeed is None:
            return False
        now = dt.utcnow()
        return self.last_succeed.year == now.year and self.last_succeed.day == now.day

    def realised():
        self.update(last_succeed = dt.utcnow(), nb_succeed=self.nb_succeed + 1)


class Followings(JsonSerializerMixin, SurrogatePK, Model):
    __tablename__ = 'followings'
    followed_user_id = reference_col('users', nullable=False)
    followed_users = relationship('User', foreign_keys=[followed_user_id], backref='following_users')
    
    following_user_id = reference_col('users', nullable=False)
    following_users = relationship('User', foreign_keys=[following_user_id], backref='followed_users')
    
    created_at = Column(db.DateTime, nullable=False, default=dt.datetime.utcnow)

    def __init__(self, followed_user_id, following_user_id):
        self.followed_user_id = followed_user_id
        self.following_user_id = following_user_id


class Ressource(JsonSerializerMixin, SurrogatePK, Model):
    __tablename__ = 'ressources'
    user_id = reference_col('users', nullable=False)
    user = relationship('User', backref='ressources')

    action_id = reference_col('actions', nullable=False)
    action = relationship('Action', backref='ressources')
    
    url = Column(db.Text, nullable=True)
    content = Column(db.Text, nullable=True)

    def __init__(self, user_id, action_id, url, content):
        self.user_id = user_id
        self.action_id = action_id
        self.content = content
        self.url = url
