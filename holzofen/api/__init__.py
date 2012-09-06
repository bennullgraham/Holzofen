from flask import Blueprint
from flask.ext.pymongo import PyMongo
from holzofen.api.util import jsonify

api = Blueprint('api', __name__)
mongo = PyMongo()


def init_app(app):
    mongo.init_app(app)
    print app.url_map


@api.route('/firing/<ObjectId:firing_id>/', methods=['GET'])
@jsonify
def firing_view(firing_id):
    return mongo.db.firings.find_one({'_id': firing_id})


@api.route('/firings/', methods=['GET'])
@jsonify
def firings():
    data = []
    for f in mongo.db.firings.find(fields='_id'):
        f['id'] = str(f['_id'])
        del f['_id']
        data.append(f)
    return data
