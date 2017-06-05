# -*- coding: utf-8 -*-
"""User views."""
from collections import defaultdict
import datetime as dt

from flask import Blueprint, render_template, jsonify
from flask_login import login_required
from .models import Action


blueprint = Blueprint('user', __name__, url_prefix='/users', static_folder='../static')

class Event(object):
    ONE_DAY_DELTA = dt.timedelta(days=1)

    def __init__(self, title, start_date, end_date, color='blue'):
        self.title = title
        self.start_date = start_date
        self.end_date = end_date
        self.color = color


@blueprint.route('/actions')
@login_required
def actions():
    """List actions."""
    user_actions = current_user.user_actions
    events = defaultdict(list)
    for action in user_actions:
        date = action.start_date
        while date <= action.end_date:
            events[action.id].append(Event(action.title, date, date))
            date += Event.ONE_DAY_DELTA
    return render_template('users/actions.html', actions=user_actions, events=events)


@blueprint.route('/actions/create', methods=['POST'])
@login_required
def create_action():
    data = request.get_json()

    # create action first
    title = data['title'] or abort(403)
    description = data['description'] or abort(403)
    Action.create(title, description)

    # create associated user action
    start_date = data['start_date'] or abort(403)
    end_date = data['end_date'] or abort(403)
    userAction = UserAction(current_user.id, action.id, start_date, end_date)
    userAction.save()

    return userAction.to_json(), 200


@blueprint.route('/inspire', methods=['GET'])
@login_required
def inspire():
    """List inspirations"""
    return render_template('users/inspire.html')


@blueprint.route('/profile', methods=['GET'])
@login_required
def profile():
    """profile page"""
    name = request.args("name")
    user = current_user if  name is None else User.query.filter(User.username == name).first_or_404()
    return render_template('users/profile.html', user=user)

