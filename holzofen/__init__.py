import os
from flask import Flask
from flask.ext.pymongo import BSONObjectIdConverter
from holzofen import static, api, content

app = Flask(__name__)

# load config
app = Flask(__name__)
app.config.from_object('holzofen.default-config')
if os.path.isfile('holzofen/local-config.py'):
    app.config.from_object('holzofen.local-config')
if os.path.isfile('holzofen/build-env.py'):
    app.config.from_object('holzofen.build-env')
if os.environ.get('HOLZOFEN_SETTINGS'):
    app.config.from_envvar('HOLZOFEN_SETTINGS')

# hax
app.url_map.converters['ObjectId'] = BSONObjectIdConverter

app.register_blueprint(static.static, url_prefix='/static')
app.register_blueprint(api.api, url_prefix='/api/1.0')
app.register_blueprint(content.content)

static.init_app(app)
api.init_app(app)
content.init_app(app)


def run():
    if app.debug == True:
        app.run(host='0.0.0.0', port=app.config['APP_PORT'])
    else:
        try:
            from gevent.wsgi import WSGIServer
            http_server = WSGIServer(('', app.config['APP_PORT']), app)
            http_server.serve_forever()
        except ImportError:
            print "gevent required"
