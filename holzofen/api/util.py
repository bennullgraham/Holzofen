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
