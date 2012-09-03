import os
from flask import Flask, render_template
from hamlish_jinja import HamlishExtension


app = Flask(__name__)
# app.config.from_object('default-config')
# if os.path.isfile('local-config.cfg'):
#     app.config.from_object('local-config')

# hamlish!
app.jinja_env.add_extension(HamlishExtension)

# configure assets
from flask.ext.assets import Environment
assets = Environment(app)
assets.versions = 'hash'
assets.url = '/static'

# load asset bundles
from webassets.loaders import YAMLLoader
here, f = os.path.split(os.path.abspath(__file__))
bundles = YAMLLoader("%s/static-src/assets.yaml" % here).load_bundles()
[assets.register(name, bundle) for name, bundle in bundles.iteritems()]


@app.errorhandler(404)
def not_found(error):
    return render_template('404.haml'), 404


@app.route('/')
def index():
    return render_template('index.haml')


def run():
    app.debug = True
    app.run(host='0.0.0.0', port=5001)
    # gevent is only required on production
    #from gevent.wsgi import WSGIServer
    #http_server = WSGIServer(('', 5001), app)
    #http_server.serve_forever()
