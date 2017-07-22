# -*- coding: utf-8 -*-
"""User views."""
import datetime as dt
from collections import defaultdict
import json

from flask import Blueprint, jsonify, render_template, request
from flask_login import current_user, login_required
from sqlalchemy import desc

from hozons.extensions import csrf_protect

from .models import Action
from .models import User

user = Blueprint('user', __name__, url_prefix='/users', static_folder='../static')

@user.route('/actions')
@login_required
def actions():
    """List actions."""
    return render_template('users/actions.html')

@user.route('/actions/get')
@login_required
def get_actions():
    """get current selected current actions"""
    #user_actions = current_user.user_actions
    user_actions = [
        {'title': 'Test', 'description': 'Une longue description', 'dates':['2017-06-09']},
        {'title': 'Test2', 'description': 'Une longue description2', 'dates':['2017-06-09']},
        {'title': 'Mierda', 'description': 'C\'est de la mierda!', 'dates':['2017-06-09']},
        {'title': 'Mierda 2', 'description': 'C\'est de la mierda number 2!', 'dates':['2017-06-09']}
    ]
    print(user_actions)
    return jsonify(user_actions)
    #return render_template('users/actions.html', actions=jsonify(user_actions), events=events)


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
    return Action.arr_to_json(
        Action.query.order_by(desc(Action.created_at)).limit(5).all(),
        exclude={'password'}
    ), 200


@user.route('/actions/create', methods=['POST'])
@login_required
@csrf_protect.exempt
def create_action():
    """create an base action"""
    data = request.get_json()
    print(data);
    # create action first
    title = data.get('title')
    description = data.get('description')
    kind = data.get('kind')
    format = data.get('format')
    Action.create(title=title, description=description)

    # create associated user action
    #start_date = data['start_date'] or abort(403)
    #end_date = data['end_date'] or abort(403)
    #userAction = UserAction(current_user.id, action.id, start_date, end_date)
    #userAction.save()

    return jsonify({}), 200
    #return userAction.to_json(), 200


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
