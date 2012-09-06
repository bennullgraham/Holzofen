from flask import Flask
from holzofen import static
# from holzofen import api


app = Flask(__name__)
app.register_blueprint(static.static)
# app.register_blueprint(api.api)

static.init_app(app)
# api.init_app(app)


def run():
    app.debug = True
    app.run(host='0.0.0.0', port=5001)
