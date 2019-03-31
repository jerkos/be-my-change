# -*- coding: utf-8 -*-
import os
from flask import Blueprint, flash, redirect, render_template, request, url_for, jsonify
from flask_login import login_required, login_user, logout_user, current_user
from flask.helpers import get_debug_flag

from bemychange.extensions import login_manager
from bemychange.model.tag.models import Tags
from bemychange.model.user.forms import RegisterForm
from bemychange.public.forms import LoginForm
from bemychange.model.user.models import User
from bemychange.utils import flash_errors
from bemychange.settings import DevConfig, ProdConfig
from goose3 import Goose

main_views = Blueprint(
    'public',
    __name__,
    static_folder='../static',
    template_folder='../templates/public')


def get_current_config():    
    return DevConfig if get_debug_flag() else ProdConfig


@login_manager.user_loader
def load_user(user_id):
    return User.get_by_id(int(user_id))


@main_views.route('/', methods=['GET', 'POST'])
def home():
    """Home page."""
    form = LoginForm(request.form)
    # Handle logging in
    if request.method == 'POST':
        if form.validate_on_submit():
            login_user(form.user)
            flash('You are logged in.', 'success')
            redirect_url = request.args.get('next') or url_for('public.inspire')
            return redirect(redirect_url)
        else:
            flash_errors(form)
    return render_template('public/home.html', form=form)


@main_views.route('/logout/')
@login_required
def logout():
    """Logout."""
    logout_user()
    flash('You are logged out.', 'info')
    return redirect(url_for('public.home'))


@main_views.route('/register/', methods=['GET', 'POST'])
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


@main_views.route('/about/')
def about():
    form = LoginForm(request.form)
    return render_template('public/about.html', form=form)


@main_views.route('/gather-informations', methods=['GET'])
def gather_informations():
    url = request.args['url']
    g = Goose({
        'local_storage_path': './data/' if os.environ.get('CC_FS_BUCKET') is not None else '.'
    })
    try:
        goose_response = g.extract(url=url)
        print(goose_response.top_image)
    except Exception as e:
        print('error')
        return jsonify({'error': True, 'message': e}), 500

    response_img = ''
    if goose_response.top_image is not None:
        response_img = goose_response.top_image.src
    return jsonify({
            'title': goose_response.title,
            'urlRequested': url,
            'text': goose_response.cleaned_text[:200],
            'mainImage': response_img
        }), 200


@main_views.route('/actions')
@login_required
def actions_view():
    """ List actions. """
    return render_template('users/actions.html')


@main_views.route('/actions/current')
@login_required
def current_actions_view():
    return render_template('current_actions.html')


@main_views.route('/actions/look-for-actions')
@login_required
def look_for_actions_view():
    return render_template('users/look_for_actions.html')


@main_views.route('/actions/create-action', methods=['GET'])
@login_required
def create_action_view():
    return render_template('users/create_action.html')


@main_views.route('/inspire', methods=['GET'])
@login_required
def inspire():
    """List inspirations"""
    return render_template('inspire.html')


@main_views.route('/profile', methods=['GET'])
@login_required
def profile():
    """profile page"""
    name = request.args.get("name")
    user = current_user if name is None else User.query.filter(User.username == name).first_or_404()
    return render_template('profile.html', user=user)

