# -*- coding: utf-8 -*-
"""User views."""
import datetime as dt
import logging
from collections import defaultdict
import json
import time

from flask import Blueprint, jsonify, render_template, request
from flask_login import current_user, login_required
from sqlalchemy import desc, func

from hozons.extensions import csrf_protect
from hozons.extensions import db

from .models import Action
from .models import User
from .models import UserAction
from .models import Commentary

user = Blueprint('user', __name__, url_prefix='/users', static_folder='../static')

PER_PAGE = 7

def paginate(query, page_nb, total_count, clazz, exclude=frozenset()):
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
                clazz.__tablename__: clazz.arr_to_dict(result, exclude=exclude)
    }
    return response


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


### services
#--------------------------------------------------------------------------
@user.route('/actions/get')
@login_required
def get_user_actions():
    """ get current selected current actions """
    requested_date = request.args.get('date')
    if requested_date is None:
        requested_date = dt.datetime.utcnow()
    else:
        requested_date = dt.datetime.strptime(requested_date, '%Y-%m-%d')
   
    return UserAction.arr_to_json(
                current_user.user_actions(requested_date), 
                exclude={'password'}
            ), 200


@user.route('/actions/get/<int:user_id>/<int:action_id>')
@login_required
def find_user_action_for_user(user_id, action_id):
    return UserAction.to_json((UserAction.query
        .filter(
            UserAction.user_id == user_id, 
            UserAction.action_id == action_id)
        .order_by(desc(UserAction.end_date))
        .one()
    ), exclude={'password'}), 200


@user.route('/actions/participate/<int:action_id>')
@login_required
def participate_to_action(action_id):
    action = Action.get_by_id(action_id)
    if action is None:
        return 'not found', 404

    start_date = request.args.get('start_date', dt.datetime.now())
    nb_days = request.args.get('nb_days', action.initial_nb_days)
    user_action = UserAction(
        current_user.id, 
        action_id, 
        start_date, 
        start_date + dt.timedelta(days=nb_days)
    )
    user_action.save()
    return UserAction.to_json(user_action, exclude={'password'}), 200


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

    response = paginate(query, page, total_count, User, exclude={'password'})
    logging.info('participants for action send response: \n' + str(response))
    return json.dumps(response), 200


@user.route('/actions/matching-with-text')
@login_required
def get_matching_text_actions():
    """search actions given a query string"""
    text_to_search = request.args.get('text', None)
    if text_to_search is None:
        return '{}', 403
    like_query = '%' + text_to_search + '%'
    return Action.arr_to_json(
        Action.query.filter(
            (Action.title.like(like_query)) |
            (Action.description.like(like_query))
        ).all(), exclude={'password'}
    ), 200


@user.route('/actions/last-actions')
@login_required
def get_last_actions():
    """get last actions created by users
        used as default values on actions page
    """
    actions = Action.query.order_by(desc(Action.created_at)).limit(5).all();

    #last_actions = Action.query.order_by(desc(Action.created_at)).limit(5).subquery();
    #users = db.session.query(User).join(UserAction).join(last_actions, last_actions.c.id == UserAction.action_id).limit(5).all()
    return Action.arr_to_json(
        actions,
        exclude={'password'}
    ), 200


@user.route('/actions/create', methods=['POST'])
@login_required
@csrf_protect.exempt
def create_action():
    """create an base action"""
    data = request.get_json(force=True)
    print(request.json)
    print(data)
    start_date = data.get('startDate')
    duration = int(data.get('actionDuration'))

    new_action = Action.create(
        title=data.get('actionTitle'), 
        description=data.get('actionDescription'),
        image_url=data.get('actionImageUrl'),
        initial_nb_days=duration,
        kind=data.get('actionType', 'PERS'),
        is_personal_action=(not data.get('isPublic')),
        public=data.get('isPublic'),
        created_at = dt.datetime.utcnow(),
        start_date=dt.datetime.strptime(start_date, '%Y-%m-%d'),
        end_date = dt.datetime.strptime(start_date, '%Y-%m-%d') + dt.timedelta(days=duration), 
        creator_user_id=current_user.id)
    return Action.to_json(new_action, exclude={'password'}), 200


@user.route('/actions/<int:action_id>/commentaries', methods=['GET'])
@login_required
def get_commentaries(action_id):
    commentaries = Commentary.query.filter(Commentary.action_id == action_id).all()
    return Commentary.arr_to_json(commentaries, exclude={'password'}), 200


@user.route('/actions/<int:action_id>/commentaries', methods=['POST'])
@login_required
@csrf_protect.exempt
def save_commentary(action_id):
    data = request.get_json(force=True)
    commentary = Commentary.create(
        content=data.get('content'), 
        user_id=current_user.id,
        action_id=data.get('action_id')
    )
    return Commentary.to_json(commentary, exclude={'password'}), 200
