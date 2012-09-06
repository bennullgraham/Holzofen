import os
from flask import Blueprint, render_template  # , current_app as app
from hamlish_jinja import HamlishExtension
# from jinja2 import Environment
from flask.ext.assets import Environment
from webassets.loaders import YAMLLoader

static = Blueprint('static', __name__, template_folder='templates')  # static_folder=''


def init_app(app):
    here, f = os.path.split(os.path.abspath(__file__))

    app.jinja_env.add_extension(HamlishExtension)

    # configure assets
    assets = Environment(app)
    assets.versions = 'hash'
    assets.url = '/static'
    assets.directory = '%s/static-src' % here

    # load asset bundles
    bundles = YAMLLoader("%s/static-src/assets.yaml" % here).load_bundles()
    [assets.register(name, bundle) for name, bundle in bundles.iteritems()]


@static.route('/', defaults={'template': 'index'})
@static.route('/template/<string:template>')
def template(template):
    return render_template('/templates/template/%s.haml' % template)
