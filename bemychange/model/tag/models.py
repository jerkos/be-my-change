from _operator import or_

from bemychange.database import JsonSerializerMixin, SurrogatePK, Model, Column, reference_col, relationship
from bemychange.extensions import db


class Tags(JsonSerializerMixin, SurrogatePK, Model):

    __tablename__ = 'tags'
    RELATIONSHIPS_TO_DICT = True

    name = Column(db.Text, nullable=False)
    parent_id = reference_col('tags', nullable=True)
    sons = relationship('Tags')

    user_id = reference_col('users', nullable=True)

    rank = Column(db.Integer, default=1)

    def __init__(self, name, parent_id, user_id, rank):
        self.name = name
        self.parent_id = parent_id
        self.user_id = user_id
        self.rank = rank

    @classmethod
    def get_tree(cls, user_id):
        subquery = Tags.query.filter(or_(Tags.user_id == user_id, Tags.user_id is None))
        return subquery.filter(Tags.rank == 1).all()

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

    @staticmethod
    def delete_sons(tag):
        for t in tag.sons:
            t.delete()


class UserActionTagMapping(JsonSerializerMixin, SurrogatePK, Model):
    __tablename__ = 'user_action_tag_mapping'

    user_action_id = reference_col('user_actions', nullable=False)
    tag_slug = Column(db.Text, default="")