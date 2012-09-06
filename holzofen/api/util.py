import json
from flask import Response


# JSON decorator; thanks https://github.com/fredj/flask-jsonify
def jsonify(f):
    def inner(*args, **kwargs):
        j = json.dumps(f(*args, **kwargs))
        return Response(j, mimetype='application/json')
    return inner
