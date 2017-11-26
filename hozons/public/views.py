# -*- coding: utf-8 -*-
"""Public section, including homepage and signup."""
from flask import Blueprint, flash, redirect, render_template, request, url_for, jsonify
from flask_login import login_required, login_user, logout_user
from flask.helpers import get_debug_flag

import lassie

from hozons.extensions import login_manager
from hozons.public.forms import LoginForm
from hozons.user.forms import RegisterForm
from hozons.user.models import User, Tags
from hozons.utils import flash_errors
from hozons.settings import DevConfig, ProdConfig

blueprint = Blueprint('public', __name__, static_folder='../static')

def get_current_config():    
    return DevConfig if get_debug_flag() else ProdConfig



@login_manager.user_loader
def load_user(user_id):
    """Load user by ID."""
    return User.get_by_id(int(user_id))


@blueprint.route('/', methods=['GET', 'POST'])
def home():
    """Home page."""
    form = LoginForm(request.form)
    # Handle logging in
    if request.method == 'POST':
        if form.validate_on_submit():
            login_user(form.user)
            flash('You are logged in.', 'success')
            redirect_url = request.args.get('next') or url_for('user.inspire')
            return redirect(redirect_url)
        else:
            flash_errors(form)
    return render_template('public/home.html', form=form)


@blueprint.route('/logout/')
@login_required
def logout():
    """Logout."""
    logout_user()
    flash('You are logged out.', 'info')
    return redirect(url_for('public.home'))


@blueprint.route('/register/', methods=['GET', 'POST'])
def register():
    """Register new user."""
    form = RegisterForm(request.form)
    if form.validate_on_submit():
        user = User.create(username=form.username.data, email=form.email.data, password=form.password.data, active=True)
        pers_tag = Tags.create(name='Personnel', parent_id=None, user_id=user.id, rank=1)
        Tags.create(name='Environnement', parent_id=None, user_id=user.id, rank=1)
        for cat in ['Vie sociale', 'Vie familiale', 'Vie professionnelle', 'Santé', 'Développement personnel', 'Vie sentimentale', 'Loisirs', 'Argent']:
            Tags.create(name=cat, parent_id=pers_tag.id, user_id=user.id, rank=2)
        flash('Thank you for registering. You can now log in.', 'success')
        return redirect(url_for('public.home'))
    else:
        flash_errors(form)
    return render_template('public/register.html', form=form)


@blueprint.route('/about/')
def about():
    """About page."""
    form = LoginForm(request.form)
    return render_template('public/about.html', form=form)


@blueprint.route('/gather-informations', methods=['GET'])
def gather_informations():
    """gaher information from an url"""
    #if request.args('url') is None:
   #     abort(400)

    #apikey = request.args('apikey', '')
    #if not apikey or apikey != get_current_config().SECRET_KEY:
    #    abort(403)
    url = request.args['url'];
    response = {}
    try:
        response = lassie.fetch(url)
    except lassie.LassieError as e:
        pass
    return jsonify(response)


