# -*- coding: utf-8 -*-
"""User views."""
import datetime as dt
import json
import logging

from flask import Blueprint, render_template, request, url_for, redirect, abort
from flask_login import current_user, login_required
from sqlalchemy import desc, func, or_, and_

from hozons.extensions import csrf_protect
from hozons.extensions import db
from .models import Action
from .models import Commentary
from .models import Tags
from .models import User
from .models import UserAction
from .models import Ressource

user = Blueprint('user', __name__, url_prefix='/users', static_folder='../static')

PER_PAGE = 7


def paginate(query, page_nb, total_count, clazz):
    """ utility query for pagination """
    logging.debug(page_nb, total_count, clazz.__tablename__, sep="; ")
    nb_pages = (total_count // PER_PAGE)
    if total_count % PER_PAGE != 0:
        nb_pages += 1

    count = PER_PAGE * (page_nb - 1)
    logging.debug(count, count + PER_PAGE, sep="; ")
    result = query.offset(count).limit(count + PER_PAGE).all()
    response = {'total_pages': nb_pages,
                'current_page': page_nb,
                clazz.__tablename__: clazz.arr_to_dict(result)
    }
    return response


###
# Base route-----------------------------------------------------------
@user.route('/actions')
@login_required
def actions_view():
    """ List actions. """
    return render_template('users/actions.html')


@user.route('/actions/current')
@login_required
def current_actions_view():
    return render_template('users/current_actions.html')


@user.route('/actions/look-for-actions')
@login_required
def look_for_actions_view():
    return render_template('users/look_for_actions.html')


@user.route('/actions/create-action', methods=['GET'])
@login_required
def create_action_view():
    return render_template('users/create_action.html')


@user.route('/inspire', methods=['GET'])
@login_required
def inspire():
    """List inspirations"""
    return render_template('users/inspire.html')


@user.route('/profile', methods=['GET'])
@login_required
def profile():
    """profile page"""
    name = request.args.get("name")
    user = current_user if name is None else User.query.filter(User.username == name).first_or_404()
    return render_template('users/profile.html', user=user)


# services
# --------------------------------------------------------------------------

@user.route('/actions/get')
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
    counting = {'commentaries': {}, 'participants': {}, 'ressources': []}
    if actions_ids:
        commentaries = db.session.query(Commentary.action_id, func.count(Commentary.action_id)) \
            .filter(
                and_(Commentary.action_id.in_(actions_ids), Commentary.is_journal == None)
            ) \
            .group_by(Commentary.action_id) \
            .all()
        commentaries = {k: v for (k, v) in commentaries}
        counting['commentaries'] = commentaries

        participants = db.session.query(UserAction.action_id, func.count(UserAction.action_id)) \
            .filter(UserAction.action_id.in_(actions_ids)) \
            .group_by(UserAction.action_id) \
            .all()
        participants = {k: v for (k, v) in participants}
        counting['participants'] = participants

    return json.dumps({
        'actions': [ua.to_dict() for ua in user_actions],
        'counting': counting
    }), 200


@user.route('/actions/user-action/delete/<int:user_action_id>', methods=['DELETE'])
@csrf_protect.exempt
@login_required
def remove_user_action(user_action_id):
    user_action = UserAction.get_by_id(user_action_id)
    if user_action is None:
        abort(404)
    user_action.delete()
    return '{}', 200


@user.route('/actions/get/<int:user_id>/<int:action_id>')
@login_required
def find_user_action_for_user(user_id, action_id):
    return UserAction.to_json((UserAction.query
        .filter(
            UserAction.user_id == user_id, 
            UserAction.action_id == action_id)
        .order_by(desc(UserAction.end_date))
        .first()
    )), 200


@user.route('/actions/user-action/done/<int:user_action_id>', methods=['GET'])
@login_required
def user_action_done(user_action_id):
    user_action = UserAction.get_by_id(user_action_id)
    if user_action is None:
        return '{}', 404
    user_action = user_action.realised()

    user_inst = User.get_by_id(user_action.user_id)
    if user is None:
        return '{}', 404
    user_inst.points_rel += 1
    user_inst.save()

    return UserAction.to_json(user_action)


@user.route('/actions/participate/<int:action_id>')
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


@user.route('/actions/<int:action_id>/participants', methods=['GET'])
#@login_required
def get_participants_for_action(action_id):
    """get participants of action"""
    page = request.args.get('page', 1)
    per_page = request.args.get('per_page', PER_PAGE)
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
    logging.info('participants for action send response: \n' + str(response))
    return json.dumps(response), 200


@user.route('/actions/matching-with-text')
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


@user.route('/actions/last-actions')
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

    #last_actions = Action.query.order_by(desc(Action.created_at)).limit(5).subquery();
    #users = db.session.query(User).join(UserAction).join(last_actions, last_actions.c.id == UserAction.action_id).limit(5).all()
    return Action.arr_to_json(
        actions * 2), 200


@user.route('/actions/create', methods=['POST', 'PUT'])
@login_required
@csrf_protect.exempt
def create_action():
    """create an base action"""
    data = request.get_json(force=True)

    if request.method == 'PUT':
        action_id_to_update =  data.get('actionId')
        description=data.get('actionDescription')
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
    print("START DATE:" + start_date)
    start_dt = dt.datetime.strptime(start_date, '%Y-%m-%d')
    end_dt = dt.datetime.strptime(start_date, '%Y-%m-%d') + dt.timedelta(days=duration)

    # finally create action and associated user action
    new_action = Action.create(
        title=data.get('actionTitle'), 
        description=data.get('actionDescription'),
        image_url=data.get('actionImageUrl'),
        initial_nb_days=duration,
        kind=data.get('actionType', 'PERS'),
        is_personal_action=(not data.get('isPublic')),
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
        tag=final_slug
    )

    return json.dumps({
        'tags': [tag.to_dict() for tag in Tags.get_tree()],
        'user_action': new_user_action.to_dict()
    }), 200


# --- commentaries
@user.route('/actions/<int:action_id>/commentaries', methods=['GET'])
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


@user.route('/actions/<int:action_id>/commentaries', methods=['POST', 'PUT'])
@login_required
@csrf_protect.exempt
def save_commentary(action_id):
    data = request.get_json(force=True)

    if request.method == 'PUT':
        comm = Commentary.query.filter(Commentary.id == data.get('commentaryId', -1)).first_or_404()
        comm.update(content=data.get('content'))
        return Commentary.to_json(comm), 200

    commentary = Commentary.create(
        content=data.get('content'), 
        user_id=current_user.id,
        action_id=data.get('action_id'),
        is_journal=data.get('is_journal', False)
    )
    return Commentary.to_json(commentary), 200


# ---tags
@user.route('/tags/all', methods=['GET'])
@login_required
def get_all_tags():
    rank = request.args.get('rank')
    if rank is None:
        return Tags.arr_to_json(Tags.get_tree(current_user.id)), 200
    return Tags.arr_to_json(
        Tags.query.filter(Tags.rank == rank).all()
    ), 200


@user.route('/tags/update', methods=['PUT'])
@login_required
@csrf_protect.exempt
def update_tag():
    data = request.get_json(force=True)
    tag_id = data.get('id')
    tag = Tags.query.filter(Tags.id == tag_id).first_or_404()
    tag.name = data.get('name')
    tag.update()
    return Tags.to_json(tag)


@user.route('/tags/create', methods=['POST'])
@login_required
@csrf_protect.exempt
def save_tag():
    data = request.get_json(force=True)
    tag = Tags.create(
        name=data.get('name'),
        parent_id=data.get('parent_id'),
        user_id=current_user.id,
        rank=data.get('rank')
    )
    return Tags.to_json(tag)


@user.route('/tags/delete/<int:tag_id>', methods=['DELETE'])
@login_required
@csrf_protect.exempt
def delete_tag(tag_id):
    tag = Tags.get_by_id(tag_id)
    # recursive delete ?

    def delete_t(t):
        if t is None:
            return
        for tt in (t.sons or []):
            delete_t(tt)
            tt.delete()
        t.delete()

    delete_t(tag)
    return '{}', 200


@user.route('/tags/change-tag/<int:user_action_id>', methods=['POST'])
@login_required
@csrf_protect.exempt
def change_tag_of_user_action(user_action_id):
    data = request.get_json(force=True)

    # first save new tags eventually
    tags_to_create = data.get('tagsToCreate')

    # all tags with fresh new ids
    new_tags = Tags.create_all(tags_to_create, current_user.id)

    # setup tag slug for action
    final_slug = Tags.build_tags_slug(data.get('tagsSlug'), new_tags)

    user_action = UserAction.query.filter(UserAction.id == user_action_id).first_or_404()
    user_action.update(tag=final_slug)

    return json.dumps({
        'tags': [tag.to_dict() for tag in Tags.get_tree(current_user.id)],
        'user_action': user_action.to_dict()
    }), 200


## ressource endpoints
@user.route('/ressources/<int: action_id>', methods=['GET', 'POST'])
@login_required
@csrf_protect.exempt
def get_ressources_for_action(action_id):
    if request.method == 'GET':
        ressources = Ressource.query.filter(Ressource.action_id == action_id).all()
        return Ressource.arr_to_json(ressources), 200
    if request.method == 'POST':
        data = request.get_json(force=True)
        Ressource.create(
            user_id=current_user.id,
            action_id=action_id,
            url=data.get('url'),
            content=data.get('content')
        )
        return json.dumps({}), 200


@user.route('/ressources/ressource-exists', methods=['GET'])
@login_required
@csrf_protect.exempt
def is_ressource_already_exists():
    url = request.args.get('url')
    if url is None:
        return json.dumps({}), 404
    return Ressource.to_json(
        Ressource.query.filter(Ressource.url == url).first_or_404()
    ), 200

