from flask import Blueprint, request, abort
from flask.ext.pymongo import PyMongo
from holzofen.api import util, parser
import calendar
from datetime import datetime

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


@api.route('/firings/<ObjectId:firing_id>', methods=('PUT',))
@util.jsonify
def firing_update(firing_id):
    mode = request.args.get('mode')
    if not mode == 'append':
        abort(404)
    
    # TODO: check last modified time is appropriate
    # TODO: check that this firing was created by a POST

    c = mongo.db.firings
    firing = c.find_one({'_id': firing_id})
    firing = parser.LiveParser().parse(firing, request.form)
    mongo.db.firings.update({'_id': firing_id}, firing)
    return str(firing_id)


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

    # request contains files; parse and store as firings
    if request.files:
        firing_ids = []
        for key, file in request.files.iteritems():
            p = parser.LogParser()
            firing = p.parse(file)
            firing_id = mongo.db.firings.insert(firing)
            firing_ids.append(str(firing_id))
        return firing_ids

    # request is empty; make new firing
    else:
        firing = {
            'data': [],
            'data_date': calendar.timegm(datetime.utcnow().timetuple()),
            'data_fields': [],
            'source': 'POST',
            'duration': None,
            'max_temp': None,
            'log_data': None
        }
        firing_id = mongo.db.firings.insert(firing)
        return str(firing_id)
