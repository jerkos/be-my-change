# -*- coding: utf-8 -*-
"""Application assets."""
from flask_assets import Bundle, Environment

css = Bundle(
    'libs/materialize/dist/css/materialize.css',
    'css/style.css',
    filters='cssmin',
    output='public/css/common.css'
)

js = Bundle(
    'libs/jquery/dist/jquery.js',
    'libs/materialize/dist/js/materialize.js',
    'js/plugins.js',
    filters='jsmin',
    output='public/js/common.js'
)

less_user = Bundle(
    'less/user.less',
    filters='less',
    output='public/css/user.css'
)

assets = Environment()

assets.register('js_all', js)
assets.register('css_all', css)
assets.register('user_css', less_user)
