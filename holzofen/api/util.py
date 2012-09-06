import json
from bson import json_util
from flask import Response
from functools import wraps


def jsonify(f):
    @wraps(f)
    def inner(*args, **kwargs):
        j = json.dumps(f(*args, **kwargs), default=json_util.default)
        return Response(j, mimetype='application/json')
    return inner


def to_dict(cursor):
    data = []
    for f in cursor:
        f['id'] = str(f['_id'])
        del f['_id']
        data.append(f)
    return data
