import datetime as dt

from sqlalchemy import func

from bemychange.database import JsonSerializerMixin, SurrogatePK, Model, Column, reference_col, relationship
from bemychange.extensions import db


class Action(JsonSerializerMixin, SurrogatePK, Model):

    __tablename__ = 'actions'
    RELATIONSHIPS_TO_DICT = True

    title = Column(db.String(200), nullable=False)
    description = Column(db.Text, nullable=False)
    image_url = Column(db.Text, nullable=True)
    initial_nb_days = Column(db.Integer, default=1)
    public = Column(db.Boolean, default=True)
    is_event = Column(db.Boolean, default=False)
    created_at = Column(db.DateTime, default=dt.datetime.utcnow)
    default_tag = Column(db.Text, nullable=True)
    creator_user_id = reference_col('users', nullable=False)
    creator = relationship('models.User')
    nb_like = Column(db.BigInteger, default=0)


class ActionLike(Model):
    __tablename__ = 'action_like'

    user_id = reference_col('users', nullable=False, primary_key=True)
    action_id = reference_col('actions', nullable=False, primary_key=True)


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
    tags = db.relationship('UserActionTagMapping', uselist=True)

    def __init__(self, user_id, action_id, start_date, end_date, tag=None):
        self.user_id = user_id
        self.action_id = action_id
        self.start_date = start_date
        self.end_date = end_date
        self.tag = tag

    @staticmethod
    def get_count_for_action_ids(action_ids):
        return db.session.query(
            UserAction.action_id,
            func.count(UserAction.action_id)
            ).filter(UserAction.action_id.in_(action_ids))\
            .group_by(UserAction.action_id)\
            .all()

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
