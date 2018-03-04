import datetime as dt
import json

from flask import Blueprint, request, abort, current_app, logging, redirect, url_for
from flask_login import login_required, current_user
from sqlalchemy import func, desc, or_

from bemychange.extensions import db, csrf_protect
from bemychange.model.action.models import UserAction, Action
from bemychange.model.commentary.models import Commentary
from bemychange.model.tag.models import Tags
from bemychange.model.user.models import User

action = Blueprint('actions', __name__, url_prefix='/user-actions', static_folder='../../static')


@action.route('/', methods=['GET'])
@login_required
def get_user_actions():
    """ get current selected current actions """
    requested_date = request.args.get('date')
    if requested_date is None:
        requested_date = dt.datetime.utcnow()
    else:
        requested_date = dt.datetime.strptime(requested_date, '%Y-%m-%d')

    user_actions = current_user.user_actions(requested_date)
    actions_ids = [ua.action_id for ua in user_actions]
    counting = {'commentaries': {}, 'participants': {}, 'resources': []}
    if actions_ids:
        commentaries = {k: v for (k, v) in Commentary.count_for_actions(actions_ids)}
        counting['commentaries'] = commentaries
        participants = {k: v for (k, v) in UserAction.get_count_for_action_ids(actions_ids)}
        counting['participants'] = participants

    return json.dumps({
        'actions': [ua.to_dict() for ua in user_actions],
        'counting': counting
    }), 200


@action.route('/', methods=['POST', 'PUT'])
@login_required
@csrf_protect.exempt
def create_action():
    """create an base action"""
    data = request.get_json(force=True)

    if request.method == 'PUT':
        action_id_to_update = data.get('actionId')
        description = data.get('actionDescription')
        action_to_update = Action.query.filter(Action.id == action_id_to_update).first_or_404()
        action_to_update.update(description=description)
        return json.dumps(action_to_update.to_dict()), 200

    start_date = data.get('startDate')
    duration = int(data.get('actionDuration', 21))

    # first save new tags eventually
    tags_to_create = data.get('tagsToCreate')

    # all tags with fresh new ids
    new_tags = Tags.create_all(tags_to_create, current_user.id)

    # setup tag slug for action
    final_slug = Tags.build_tags_slug(data.get('tagsSlug'), new_tags)

    # setup dates
    start_dt = dt.datetime.strptime(start_date, '%Y-%m-%d')
    end_dt = dt.datetime.strptime(start_date, '%Y-%m-%d') + dt.timedelta(days=duration)

    # finally create action and associated user action
    new_action = Action.create(
        title=data.get('actionTitle'),
        description=data.get('actionDescription'),
        image_url=data.get('actionImageUrl'),
        initial_nb_days=duration,
        public=data.get('isPublic'),
        created_at=dt.datetime.utcnow(),
        start_date=start_dt,
        end_date=end_dt,
        creator_user_id=current_user.id,
        default_tag=final_slug or None
    )

    new_user_action = UserAction.create(
        user_id=current_user.id,
        action_id=new_action.id,
        start_date=start_dt,
        end_date=end_dt,
        # tag=final_slug
    )

    db.engine.execute('insert into user_action_tag_mapping(user_action_id, tag_slug) values(:uaid, :tag)',
                      **{'uaid': new_user_action.id, 'tag': final_slug})

    return json.dumps({
        'tags': [tag.to_dict() for tag in Tags.get_tree(current_user.id)],
        'user_action': new_user_action.to_dict()
    }), 200


@action.route('/<int:user_action_id>', methods=['DELETE'])
@csrf_protect.exempt
@login_required
def remove_user_action(user_action_id):
    user_action = UserAction.get_by_id(user_action_id)
    if user_action is None:
        abort(404)
    user_action.delete()
    return '{}', 200


@action.route('/<int:user_id>/<int:action_id>', methods=['GET'])
@login_required
def find_user_action_for_user(user_id, action_id):
    return UserAction.to_json(
        (UserAction.query.filter(
            UserAction.user_id == user_id,
            UserAction.action_id == action_id
        ).order_by(desc(UserAction.end_date))
         .first()
         )
    ), 200


@action.route('/<int:user_action_id>/done', methods=['GET'])
@login_required
def user_action_done(user_action_id):
    user_action = UserAction.get_by_id(user_action_id)
    if user_action is None:
        return '{}', 404
    user_action = user_action.realised()

    user_inst = User.get_by_id(user_action.user_id)
    if user_inst is None:
        return '{}', 404
    user_inst.points += 1
    user_inst.save()
    return UserAction.to_json(user_action)


@action.route('/<int:action_id>/participate')
@login_required
def participate_to_action(action_id, tag=None):
    action = Action.get_by_id(action_id)
    if action is None:
        return 'not found', 404

    start_date = request.args.get('start_date', dt.datetime.now())
    nb_days = request.args.get('nb_days', action.initial_nb_days)
    user_action = UserAction.create(
        user_id=current_user.id,
        action_id=action_id,
        start_date=start_date,
        end_date=start_date + dt.timedelta(days=nb_days),
        tag=tag
    )
    return UserAction.to_json(user_action), 200


@action.route('/<int:action_id>/participants', methods=['GET'])
#@login_required
def get_participants_for_action(action_id):
    """get participants of action"""
    page = request.args.get('page', 1)
    per_page = request.args.get('per_page', current_app.config['PER_PAGE'])
    total_count = (db.session.query(func.count(User.id))
                   .join(UserAction)
                   .filter(UserAction.action_id == action_id)
                   .scalar())
    if Action.get_by_id(action_id is None):
        return '{\"message\": not found}', 404

    query = (User.query
             .join(UserAction)
             .join(Action)
             .filter(UserAction.action_id == action_id))

    response = paginate(query, page, total_count, User)
    logging.DEBUG('participants for action send response: \n' + str(response))
    return json.dumps(response), 200


@action.route('/matching-with-text')
@login_required
def get_matching_text_actions():
    """search actions given a query string"""
    text_to_search = request.args.get('text', None)
    if not text_to_search:
        redirect(url_for('user.get_last_actions'))
    like_query = '%' + text_to_search + '%'
    return Action.arr_to_json(
        Action.query.filter(
            (Action.title.like(like_query)) |
            (Action.description.like(like_query))
        ).all()), 200


@action.route('/last-actions')
@login_required
def get_last_actions():
    """get last actions created by users
        used as default values on actions page
    """

    actions_pers = db.session.query(Action.id).filter(Action.kind == 'PERS').order_by(desc(Action.created_at)).limit(5).subquery()
    actions_env = db.session.query(Action.id).filter(Action.kind == 'ENV').order_by(desc(Action.created_at)).limit(5).subquery()
    actions_rel = db.session.query(Action.id).filter(Action.kind == 'REL').order_by(desc(Action.created_at)).limit(5).subquery()

    actions = Action.query.filter(
        or_(
            Action.id.in_(actions_pers),
            Action.id.in_(actions_env),
            Action.id.in_(actions_rel)
        )
    ).all()

    # subquery = db.session.query(
    #     Action,
    #     func.rank().over(
    #         order_by=Action.created_at.desc(),
    #         partition_by=Action.kind
    #     ).label('rnk')
    # ).subquery()

    # query = db.session.query(subquery).filter(subquery.c.rnk >= 5)
    # actions = query.all()
    print(actions)

    return Action.arr_to_json(actions * 2), 200
