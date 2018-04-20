import json

from flask import Blueprint, request
from flask_login import login_required, current_user
from sqlalchemy import text

from bemychange.extensions import csrf_protect, db
from bemychange.model.action.models import UserAction
from bemychange.model.tag.models import Tags, UserActionTagMapping

tag = Blueprint('tags', __name__, url_prefix='/tags', static_folder='../../static')


@tag.route('/all', methods=['GET'])
@login_required
def get_all_tags():
    rank = request.args.get('rank')
    if rank is None:
        return Tags.arr_to_json(Tags.get_tree(current_user.id)), 200
    return Tags.arr_to_json(
        Tags.query.filter(Tags.rank == rank).all()
    ), 200


@tag.route('/<int:tag_id>', methods=['PUT', 'POST'])
@login_required
@csrf_protect.exempt
def update_tag(tag_id):
    data = request.get_json(force=True)

    if request.method == 'PUT':
        tag_inst = Tags.query.filter(Tags.id == tag_id).first_or_404()
        tag_inst.name = data.get('name')
        tag_inst.update()
        return Tags.to_json(tag_inst)

    return Tags.to_json(Tags.create(
        name=data.get('name'),
        parent_id=data.get('parent_id'),
        user_id=current_user.id,
        rank=data.get('rank')
    ))


@tag.route('/<int:tag_id>', methods=['DELETE'])
@login_required
@csrf_protect.exempt
def delete_tag(tag_id):
    tag_inst = Tags.get_by_id(tag_id)
    # recursive delete ?

    def delete_t(t):
        if t is None:
            return
        for tt in (t.sons or []):
            delete_t(tt)
            tt.delete()
        t.delete()

    delete_t(tag_inst)
    return '{}', 200


@tag.route('/change-tag/<int:user_action_id>', methods=['POST'])
@login_required
@csrf_protect.exempt
def change_tag_of_user_action(user_action_id):
    data = request.get_json(force=True)
    tag_mapping_id = request.args.get('tag_mapping_id')
    # first save new tags eventually
    tags_to_create = data.get('tagsToCreate')

    # all tags with fresh new ids
    new_tags = Tags.create_all(tags_to_create, current_user.id)

    # setup tag slug for action
    final_slug = Tags.build_tags_slug(data.get('tagsSlug'), new_tags)

    if tag_mapping_id is not None:
        tag_mapping = UserActionTagMapping.query.filter(UserActionTagMapping.id == tag_mapping_id).first_or_404()
        tag_mapping.update(tag_slug=final_slug)
    else:
        db.engine.execute(
            text('insert into user_action_tag_mapping(user_action_id, tag_slug) values(:uaid, :tag)'),
            **{'uaid': user_action_id, 'tag': final_slug}
        )

    user_action = UserAction.query.filter(UserAction.id == user_action_id).first_or_404()

    return json.dumps({
        'tags': [tag_inst.to_dict() for tag_inst in Tags.get_tree(current_user.id)],
        'user_action': user_action.to_dict()
    }), 200
