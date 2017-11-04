# -*- coding: utf-8 -*-
"""User models."""
import datetime as dt
from itertools import groupby

from flask_login import UserMixin
from sqlalchemy import func, and_, or_

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
    
    def user_actions(self, requested_date):
        data = UserAction.query.filter(
            or_(UserAction.start_date <= requested_date,
            UserAction.end_date >= requested_date), 
            UserAction.user_id == self.get_id()).join(Action).all()
        print(data)
        return data
           

class Action(JsonSerializerMixin, SurrogatePK, Model):
    __tablename__ = 'actions'
    RELATIONSHIPS_TO_DICT = True

    title = Column(db.String(200), nullable=False)
    description = Column(db.Text, nullable=False)
    image_url = Column(db.Text, nullable=True)
    
    initial_nb_days = Column(db.Integer, default=1)

    kind = Column(db.Text, nullable=True, default='PERS')
    is_personal_action = Column(db.Boolean, default=True)
    public = Column(db.Boolean, default=True)
    is_event = Column(db.Boolean, default=False)

    created_at = Column(db.DateTime, default=dt.datetime.utcnow)
    start_date = Column(db.DateTime)
    end_date = Column(db.DateTime)

    default_tag = Column(db.Text, nullable=True)

    creator_user_id = reference_col('users', nullable=False)
    creator = relationship('models.User') #, backref='created_actions')

    def __repr__(self):
        return '<Action {title}>'.format(title=self.title)

    def get_users(self):
        return
        #return db.session.query(func.count(UserAction.id).label('count')).filter(UserAction.action_id == self.id).distinct().all()


class UserAction(JsonSerializerMixin, SurrogatePK, Model):
    __tablename__ = 'user_actions'
    RELATIONSHIPS_TO_DICT = True

    user_id = reference_col('users', nullable=False)
    user = relationship('models.User')

    action_id = reference_col('actions', nullable=False)
    action = relationship('models.Action')

    created_at = Column(db.DateTime, nullable=False, default=dt.datetime.utcnow)
    start_date = Column(db.DateTime, nullable=False)
    end_date = Column(db.DateTime, nullable=False)

    last_succeed = Column(db.DateTime, nullable=True)
    nb_succeed = Column(db.Integer, nullable=False, default=0)

    tag = Column(db.Text, nullable=True)


    def __init__(self, user_id, action_id, start_date, end_date, tag=None):
        self.user_id = user_id
        self.action_id = action_id
        self.start_date = start_date
        self.end_date = end_date
        self.tag = tag

    def has_been_realised_today(self):
        if self.last_succeed is None:
            return False
        now = dt.utcnow(self)
        return self.last_succeed.year == now.year and self.last_succeed.day == now.day
    
    def have_to_do_it(self, date):
        if not isinstance(date, dt.datetime):
            raise ValueError('date not an instance of datetime')
        return self.start_date.date() <= date.date() <= self.end_date.date()

    def realised(self):
        return self.update(last_succeed=dt.datetime.utcnow(), nb_succeed=self.nb_succeed + 1)


class Tags(JsonSerializerMixin, SurrogatePK, Model):
    __tablename__ = 'tags'
    RELATIONSHIPS_TO_DICT = True

    name = Column(db.Text, nullable=False)
    
    parent_id = reference_col('tags', nullable=True)
    sons = relationship('Tags', uselist=True)
    
    user_id = reference_col('users', nullable=True)

    rank = Column(db.Integer, default=1)

    def __init__(self, name, parent_id, user_id, rank):
        self.name = name
        self.parent_id = parent_id
        self.user_id = user_id
        self.rank = rank

    @classmethod
    def get_tree(cls):
        return Tags.query.filter(Tags.rank == 1).all()

    @staticmethod
    def build_tags_slug(tags_slug, new_tags):
        # setup tags slug
        tags_slug_splitted = tags_slug.split('-')
        ith_zero = 0
        good_slug = []
        last_parent_id = None

        for nb in tags_slug_splitted:
            if nb == '0':
                tag = new_tags[ith_zero]
                if tag.parent_id is None:
                    tag.update(parent_id=last_parent_id)
                good_slug.append(str(tag.id))
                ith_zero += 1
                last_parent_id = tag.id
            else:
                good_slug.append(nb)
                last_parent_id = int(nb)

        return '-'.join(good_slug)

    @staticmethod
    def create_all(tags, user_id):
        return [
             Tags.create(name=tag['name'],
                         parent_id=tag['parent_id'],
                         user_id=user_id,
                         rank=tag['rank'])
             for tag in tags
        ]


class Followings(JsonSerializerMixin, SurrogatePK, Model):
    __tablename__ = 'followings'
    followed_user_id = reference_col('users', nullable=False)
    followed_users = relationship('models.User', foreign_keys=[followed_user_id], backref='following_users')

    following_user_id = reference_col('users', nullable=False)
    following_users = relationship('models.User', foreign_keys=[following_user_id], backref='followed_users')

    created_at = Column(db.DateTime, nullable=False, default=dt.datetime.utcnow)

    def __init__(self, followed_user_id, following_user_id):
        self.followed_user_id = followed_user_id
        self.following_user_id = following_user_id


class Ressource(JsonSerializerMixin, SurrogatePK, Model):
    __tablename__ = 'ressources'
    user_id = reference_col('users', nullable=False)
    user = relationship('models.User', backref='ressources')

    action_id = reference_col('actions', nullable=False)
    action = relationship('Action', backref='ressources')

    url = Column(db.Text, nullable=True)
    content = Column(db.Text, nullable=True)

    def __init__(self, user_id, action_id, url, content):
        self.user_id = user_id
        self.action_id = action_id
        self.content = content
        self.url = url


class Commentary(JsonSerializerMixin, SurrogatePK, Model):
    __tablename__ = 'commentaries'
    RELATIONSHIPS_TO_DICT = True

    content = Column(db.Text, nullable=False)
    created_at = Column(db.DateTime, default=dt.datetime.utcnow())

    user_id = reference_col('users', nullable=False)
    user = relationship('models.User')

    action_id = reference_col('actions', nullable=False)
    action = relationship('Action')

    def __init__(self, content, user_id, action_id):
        """Create instance."""
        self.content = content
        self.user_id = user_id
        self.action_id = action_id