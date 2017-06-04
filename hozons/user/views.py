# -*- coding: utf-8 -*-
"""User views."""
from flask import Blueprint, render_template
from flask_login import login_required
from .models import Action


blueprint = Blueprint('user', __name__, url_prefix='/users', static_folder='../static')


@blueprint.route('/actions')
@login_required
def actions():
    """List members."""
    actions = Action.get_by_id(1)
    print(str(actions))

    perso_intentions = []
    perso_intentions += [
        {'title': 'Etre centré',
         'score': 78,
         'finished_actions': 32,
         'contributions': 14,
         'helpers': 14
         },
        {'title': 'Be happy with your life',
         'score': 89,
         'finished_actions': 32,
         'contributions': 14,
         'helpers': 14
         },
        {'title': 'Find love',
         'score': 14,
         'finished_actions': 1,
         'contributions': 158,
         'helpers': 2
         },
        {'title': 'Be proud of you',
         'score': 78,
         'finished_actions': 32,
         'contributions': 14,
         'helpers': 14
         },
        {'title': 'Make some child',
         'score': 78,
         'finished_actions': 32,
         'contributions': 14,
         'helpers': 14
         }
    ]
    return render_template('users/actions.html', perso_intentions=perso_intentions, actions=[], form=None)

@blueprint.route('/inspire', methods=['GET'])
@login_required
def inspire():
    return render_template('users/inspire.html')


@blueprint.route('/profile', methods=['GET'])
@login_required
def profile():
    return render_template('users/profile.html')

