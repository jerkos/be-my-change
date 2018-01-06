import json

from flask import Blueprint, request
from flask_login import current_user, login_required

from hozons.extensions import csrf_protect
from hozons.resources.models import Resource

resource = Blueprint('resource', __name__, url_prefix='/resources', static_folder='../static')


@resource.route('/<int:action_id>', methods=['GET', 'POST'])
@login_required
@csrf_protect.exempt
def get_resources_for_action(action_id):
    if request.method == 'GET':
        resources = Resource.query.filter(Resource.action_id == action_id).all()
        return Resource.arr_to_json(resources), 200
    if request.method == 'POST':
        data = request.get_json(force=True)
        Resource.create(
            user_id=current_user.id,
            action_id=action_id,
            url=data.get('url'),
            content=data.get('content')
        )
        return json.dumps({}), 200


@resource.route('/resource-exists', methods=['GET'])
@login_required
@csrf_protect.exempt
def is_resource_already_exists():
    url = request.args.get('url')
    if url is None:
        return json.dumps({}), 404
    return Resource.to_json(
        Resource.query.filter(Resource.url == url).first_or_404()
    ), 200
