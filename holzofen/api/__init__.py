from flask import Blueprint, request
from flask.ext.pymongo import PyMongo
from holzofen.api import util, log_parser

api = Blueprint('api', __name__)
mongo = PyMongo()


def init_app(app):
    mongo.init_app(app)


@api.route('/firings/<ObjectId:firing_id>/', methods=['GET'])
@util.jsonify
def firing_view(firing_id):
    return mongo.db.firings.find_one({'_id': firing_id})


@api.route('/firings/', methods=['GET'])
@util.jsonify
def firing_index():
    return util.to_dict(mongo.db.firings.find(fields='_id'))


@api.route('/firings/', methods=['POST'])
@util.jsonify
def firing_add():
    firing_ids = []
    for key, file in request.files.iteritems():
        p = log_parser.Parser()
        firing = p.parse(file)
        oid = mongo.db.firings.insert(firing)
        firing_ids.append(str(oid))
    return firing_ids
