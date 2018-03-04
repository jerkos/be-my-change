import datetime as dt

from _operator import and_
from sqlalchemy import func

from bemychange.database import JsonSerializerMixin, SurrogatePK, Model, Column, reference_col, relationship
from bemychange.extensions import db


class Commentary(JsonSerializerMixin, SurrogatePK, Model):
    __tablename__ = 'commentaries'
    RELATIONSHIPS_TO_DICT = True

    content = Column(db.Text, nullable=False)
    created_at = Column(db.DateTime, default=dt.datetime.utcnow())

    user_id = reference_col('users', nullable=False)
    user = relationship('models.User')

    action_id = reference_col('actions', nullable=False)
    action = relationship('Action')

    is_journal = Column(db.Boolean, nullable=False, default=False)

    @staticmethod
    def count_for_actions(action_ids: list):
        return db.session.query(
            Commentary.action_id,
            func.count(Commentary.action_id))\
            .filter(
                and_(
                    Commentary.action_id.in_(action_ids),
                    Commentary.is_journal == None
                )
            ).group_by(Commentary.action_id)\
            .all()
