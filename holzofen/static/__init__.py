import os
from flask import Blueprint
from flask.ext.assets import Environment
from webassets.loaders import YAMLLoader
from webassets.filter import register_filter
from lib import rjsfilter


register_filter(rjsfilter.RjsFilter)
static = Blueprint('static', __name__)


def init_app(app):
    here, f = os.path.split(os.path.abspath(__file__))

    # configure assets
    assets = Environment(app)
    assets.versions = 'hash'
    assets.directory = '%s/src' % here

    # i have no idea why, but an arbitrary
    # second path segment is required here
    assets.url = '/static/turnip'

    # load asset bundles
    bundles = YAMLLoader("%s/src/assets.yaml" % here).load_bundles()
    [assets.register(name, bundle) for name, bundle in bundles.iteritems()]
