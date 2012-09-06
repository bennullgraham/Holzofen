from flask import Blueprint, render_template
from hamlish_jinja import HamlishExtension

content = Blueprint('content', __name__, template_folder='templates')


def init_app(app):
    app.jinja_env.add_extension(HamlishExtension)


@content.route('/')
def index():
    return render_template('index.haml')


@content.route('/template/<string:template>')
def template(template):
    return render_template('/underscore/%s.haml' % template)
