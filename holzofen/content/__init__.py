from flask import Blueprint, render_template, current_app as app
from hamlish_jinja import HamlishExtension
from subprocess import check_output, CalledProcessError

content = Blueprint('content', __name__, template_folder='templates')


def init_app(app):
    app.jinja_env.add_extension(HamlishExtension)


@content.route('/')
def index():
    try:
        git_dir = '--git-dir=%s' % app.config['GIT_DIR']
        rev = check_output(['git', git_dir, 'rev-parse', '--short', 'HEAD'])
    except CalledProcessError:
        rev = 'unknown'
    return render_template('index.haml', rev=rev)



@content.route('/template/<string:template>')
def template(template):
    return render_template('/underscore/%s.haml' % template)
