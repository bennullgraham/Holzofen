from flask import Blueprint, request
from flask.ext.pymongo import PyMongo
from holzofen.api import util, log_parser

api = Blueprint('api', __name__)
mongo = PyMongo()


def init_app(app):
    mongo.init_app(app)


@api.route('/firings/<ObjectId:firing_id>', methods=('GET',))
@util.jsonify
def firing_view(firing_id):
    return mongo.db.firings.find_one({'_id': firing_id})


@api.route('/firings/<ObjectId:firing_id>', methods=('DELETE',))
@util.jsonify
def firing_delete(firing_id):
    c = mongo.db.firings
    c.update({'_id': firing_id},
             {'$set': {'deleted': True}}
    )
    return True


@api.route('/firings/', methods=('GET',))
@util.jsonify
def firing_index():
    c = mongo.db.firings
    firings = c.find(spec={'deleted': {'$exists': False}},
                     fields=['_id', 'data_date']
    )
    return util.to_dict(firings)


@api.route('/firings/', methods=('POST',))
@util.jsonify
def firing_add():
    firing_ids = []
    for key, file in request.files.iteritems():
        p = log_parser.Parser()
        firing = p.parse(file)
        firing_id = mongo.db.firings.insert(firing)
        firing_ids.append(str(firing_id))
    return firing_ids
