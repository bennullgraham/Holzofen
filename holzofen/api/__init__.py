from flask import Blueprint
from flask.ext.pymongo import PyMongo
from holzofen.api import util

api = Blueprint('api', __name__)
mongo = PyMongo()


def init_app(app):
    mongo.init_app(app)


@api.route('/firing/<ObjectId:firing_id>/', methods=['GET'])
@util.jsonify
def firing_view(firing_id):
    return mongo.db.firings.find_one({'_id': firing_id})


@api.route('/firings/', methods=['GET'])
@util.jsonify
def firings():
    return util.to_dict(mongo.db.firings.find(fields='_id'))
