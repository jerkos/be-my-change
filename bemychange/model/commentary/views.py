from flask import Blueprint, request
from flask_login import login_required, current_user
from sqlalchemy import and_, or_

from bemychange.extensions import csrf_protect
from bemychange.model.commentary.models import Commentary

commentary = Blueprint('commentaries', __name__, url_prefix='/commentaries', static_folder='../../static')


@commentary.route('/<int:action_id>', methods=['GET'])
@login_required
def get_commentaries(action_id):
    is_journal = request.args.get('is_journal')
    if is_journal == 'True':
        # todo put in a function in commentary class
        print("is journal is true")
        commentaries = Commentary.query.filter(
            and_(
                Commentary.action_id == action_id,
                Commentary.user_id == current_user.id,
                Commentary.is_journal == True  # does not worl with is
            )).all()
    else:
        commentaries = Commentary.query.filter(
            and_(
                Commentary.action_id == action_id,
                or_(
                    Commentary.is_journal == False,
                    Commentary.is_journal == None
                )
            )).all()
    return Commentary.arr_to_json(commentaries), 200


@commentary.route('/<int:commentary_id>', methods=['POST', 'PUT'])
@login_required
@csrf_protect.exempt
def save_commentary(commentary_id):
    data = request.get_json(force=True)

    if request.method == 'PUT':
        comm = Commentary.query.filter(Commentary.id == (commentary_id or -1)).first_or_404()
        comm.update(content=data.get('content'))
        return Commentary.to_json(comm), 200

    return Commentary.to_json(Commentary.create(
        content=data.get('content'),
        user_id=current_user.id,
        action_id=data.get('action_id'),
        is_journal=data.get('is_journal', False)
    )), 200
