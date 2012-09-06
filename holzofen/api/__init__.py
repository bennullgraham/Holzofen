from flask import Blueprint
from holzofen.api.util import jsonify

api = Blueprint('api', __name__)


def init_app(app):
    pass


@api.route('/firings', methods=['GET'])
@jsonify
def firings():
    return {
        1: "15kj24598bxz",
        2: "bcsbscv76scvgh",
        3: "khfshgdf79sdfh"
    }
