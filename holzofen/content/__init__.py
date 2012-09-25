import os
from flask import Blueprint, render_template, current_app as app
from hamlish_jinja import HamlishExtension
from subprocess import check_output, CalledProcessError
from holzofen.api import util


content = Blueprint('content', __name__, template_folder='templates')


def init_app(app):
    app.jinja_env.add_extension(HamlishExtension)


@content.route('/')
def index():
    rev = 'unknown'
    if 'GIT_REV' in app.config.keys() and app.config['GIT_REV']:
        rev = app.config['GIT_REV']
    elif app.debug:
        try:
            rev = check_output(['git', 'rev-parse', '--short', 'HEAD'])
        except CalledProcessError:
            pass
    return render_template('index.haml', rev=rev)


@content.route('/templates/', methods=('GET',))
@util.jsonify
def template_index():
    """Serve a JSON dict of all template names and their contents"""
    templates = os.listdir('holzofen/content/templates/underscore/')
    rendered = {}
    for template in templates:
        key = template.rsplit('.', 1)[0]
        rendered[key] = (render_template('/underscore/%s' % template))
    return rendered


@content.route('/templates/<string:template>', methods=('GET',))
def template_view(template):
    """Serve a single template"""
    return render_template('/underscore/%s.haml' % template)


@content.route("/content/", methods=('GET',))
@util.jsonify
def content_index():
    """Serve a JSON dict of content titles and the ids that can be used to retrieve them"""
    return [
        {'title': 'Construction', 'id': 'construction'},
        {'title': 'Menu',         'id': 'menu'}
    ]


@content.route("/content/<string:content_id>", methods=('GET',))
@util.jsonify
def content_view(content_id):
    """Serve a content page encoded with JSON"""
    return {
        'content': render_template('/content/%s.haml' % content_id)
    }
