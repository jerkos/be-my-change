# -*- coding: utf-8 -*-
import datetime as dt

from flask_login import UserMixin
from sqlalchemy import text
from sqlalchemy.dialects.postgresql.json import JSONB

from bemychange.database import Column, Model, SurrogatePK, db, reference_col, relationship, JsonSerializerMixin
from bemychange.extensions import bcrypt


class Role(SurrogatePK, Model):
    __tablename__ = 'roles'
    name = Column(db.String(80), unique=True, nullable=False)
    user_id = reference_col('users', nullable=True)
    user = relationship('models.User', backref='roles')


class User(JsonSerializerMixin, UserMixin, SurrogatePK, Model):

    __tablename__ = 'users'
    RELATIONSHIPS_TO_DICT = True

    username = Column(db.String(80), unique=True, nullable=False)
    email = Column(db.String(80), unique=True, nullable=False)
    password = Column(db.Binary(128), nullable=True)  #: The hashed password
    created_at = Column(db.DateTime, nullable=False, default=dt.datetime.utcnow)
    first_name = Column(db.String(30), nullable=True)
    last_name = Column(db.String(30), nullable=True)
    has_image = Column(db.Boolean(), default=False)
    active = Column(db.Boolean(), default=False)
    is_admin = Column(db.Boolean(), default=False)
    points = Column(db.Integer, default=0)
    connexions = Column(JSONB)

    def __init__(self, username, email, password=None, **kwargs):
        db.Model.__init__(self, username=username, email=email, **kwargs)
        if password:
            self.set_password(password)
        else:
            self.password = None

    def set_password(self, password):
        self.password = bcrypt.generate_password_hash(password)

    def check_password(self, value):
        return bcrypt.check_password_hash(self.password, value)

    @property
    def full_name(self):
        return '{0} {1}'.format(self.first_name, self.last_name)

    def user_actions(self, requested_date):
        with open('./bemychange/model/user/sql/user_actions.sql') as file_handle:
            content = file_handle.read()

        rows = db.engine.execute(
            text(content),
            **{'requested_date': requested_date, 'user_id': self.get_id()}
        )
        return rows.first()['result'] or []

    @staticmethod
    def find(user_id):
        rows = db.engine.execute(
            text('select row_to_json(_) as result from (select * from users where id = :user_id)_'),
            **{'user_id': user_id}
        )
        return rows.first()['result'] or None

