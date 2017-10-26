"""empty message

Revision ID: 1253a34c52fb
Revises: bd1852c4906a
Create Date: 2017-10-21 22:08:49.903275

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '1253a34c52fb'
down_revision = 'bd1852c4906a'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    pass
    #op.drop_column('commentaries', 'title')
    #op.add_column('tags', sa.Column('user_id', sa.Integer(), nullable=True))
    #op.create_foreign_key(None, 'tags', 'users', ['user_id'], ['id'])
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'tags', type_='foreignkey')
    op.drop_column('tags', 'user_id')
    op.add_column('commentaries', sa.Column('title', sa.TEXT(), nullable=True))
    # ### end Alembic commands ###
