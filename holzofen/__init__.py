import os
from flask import Flask
from flask.ext.pymongo import BSONObjectIdConverter
from holzofen import static, api, content

app = Flask(__name__)

# load config
app = Flask(__name__)
app.config.from_object('holzofen.default-config')
if os.path.isfile('local-config.py'):
    app.config.from_object('local-config')
if os.environ.get('SUBFUSC_SETTINGS'):
    app.config.from_envvar('SUBFUSC_SETTINGS')

# hax
app.url_map.converters['ObjectId'] = BSONObjectIdConverter

app.register_blueprint(static.static, url_prefix='/static')
app.register_blueprint(api.api, url_prefix='/api/1.0')
app.register_blueprint(content.content)

static.init_app(app)
api.init_app(app)
content.init_app(app)


def run():
    app.debug = True
    app.run(host='0.0.0.0', port=5001)
