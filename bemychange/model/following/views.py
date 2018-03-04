from flask import Blueprint

following = Blueprint('followings', __name__, url_prefix='/followings', static_folder='../../static')

