from hozons.database import JsonSerializerMixin, SurrogatePK, Model, reference_col, relationship, Column
from hozons.extensions import db


class Resource(JsonSerializerMixin, SurrogatePK, Model):
    __tablename__ = 'resources'

    user_id = reference_col('users', nullable=False)
    user = relationship('models.User', backref='resources')

    action_id = reference_col('actions', nullable=False)
    action = relationship('Action', backref='resources')

    nblike = Column(db.BigInteger, default=0)

    url = Column(db.Text, nullable=True)
    content = Column(db.Text, nullable=True)

    def __init__(self, user_id, action_id, url, content):
        self.user_id = user_id
        self.action_id = action_id
        self.content = content
        self.url = url


class ResourceLike(Model):
    __tablename__ = 'resources_like'

    user_id = reference_col('users', nullable=False, primary_key=True)
    resource_id = reference_col('resources', nullable=False, primary_key=True)
