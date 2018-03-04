import datetime as dt
from bemychange.database import JsonSerializerMixin, SurrogatePK, Model, reference_col, relationship, Column
from bemychange.extensions import db


class Followings(JsonSerializerMixin, SurrogatePK, Model):
    __tablename__ = 'followings'
    followed_user_id = reference_col('users', nullable=False)
    followed_users = relationship('models.User', foreign_keys=[followed_user_id], backref='following_users')

    following_user_id = reference_col('users', nullable=False)
    following_users = relationship('models.User', foreign_keys=[following_user_id], backref='followed_users')

    created_at = Column(db.DateTime, nullable=False, default=dt.datetime.utcnow)
