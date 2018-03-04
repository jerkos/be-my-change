# -*- coding: utf-8 -*-

from flask import Blueprint

user = Blueprint('user', __name__, url_prefix='/users', static_folder='../static')
