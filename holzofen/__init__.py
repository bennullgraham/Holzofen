from flask import Flask
from flask.ext.pymongo import BSONObjectIdConverter
from holzofen import static
from holzofen import api


app = Flask(__name__)

# hax
app.url_map.converters['ObjectId'] = BSONObjectIdConverter

app.register_blueprint(static.static)
app.register_blueprint(api.api, url_prefix='/api')

static.init_app(app)
api.init_app(app)


def run():
    app.debug = True
    app.run(host='0.0.0.0', port=5001)
