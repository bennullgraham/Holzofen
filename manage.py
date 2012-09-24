from flask.ext.script import Manager
from holzofen import app

manager = Manager(app)


@manager.command
def assets(cmd):
    from webassets import script
    env = app.jinja_env.assets_environment
    script.main((cmd,), env=env)


if __name__ == "__main__":
    manager.run()
