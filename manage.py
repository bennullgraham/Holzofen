from flask.ext.script import Manager
from holzofen import app

manager = Manager(app)


@manager.command
def assets_rebuild():
    from webassets import script
    env = app.jinja_env.assets_environment
    script.main(('build', '--no-cache'), env=env)


if __name__ == "__main__":
    manager.run()
