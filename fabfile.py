from fabric.api import *
from contextlib import contextmanager as _contextmanager

# the user to use for the remote commands
env.user = 'bgraham'
env.use_ssh_config = True
env.directory = '/var/www/Holzofen'
env.static = '/var/www/Holzofen/static'
env.docs = '/var/www/Holzofen/docs'
env.activate = 'source /var/www/Holzofen/env/bin/activate'


def bootstrap():
    _bootstrap()
    _install_virtualenv()
    _install_gevent()
    _install_mongo()


def pack():
    _configure()
    _pack()


def deploy():
    _upload()
    _backup_db()
    _install()


def _configure():
    local('if [ -f holzofen/build.env.py ]; then rm holzofen/build-env.py; fi')

    # write git revision to config so we can display it without
    # installing git on production machine
    local('echo "GIT_REV = \'$(git rev-parse --short HEAD)\'" >> holzofen/build-env.py')


def _pack():
    local('make --directory=docs html')
    local('python manage.py assets_rebuild')
    local('python setup.py sdist --formats=gztar', capture=False)


def _upload():
    dist = local('python setup.py --fullname', capture=True).strip()
    put('dist/%s.tar.gz' % dist, '/tmp/Holzofen.tar.gz')
    run('mkdir -p /tmp/Holzofen && rm -rf /tmp/Holzofen/*')


def _install():
    with cd('/tmp/Holzofen'):
        run('tar --strip-components=1 -xzf /tmp/Holzofen.tar.gz')
        run('rsync -rav --delete --exclude=\'*.py\' --exclude=\'*.pyc\' --exclude=\'/src\' /tmp/Holzofen/holzofen/static/* %s' % env.static)
        run('rsync -rav --delete /tmp/Holzofen/docs/.build/html/* %s' % env.docs)
        run('/var/www/Holzofen/env/bin/python setup.py install')
    run('rm -rf /tmp/Holzofen /tmp/Holzofen.tar.gz')
    run('touch /var/www/Holzofen/Holzofen.py')


def _backup_db():
    import datetime
    import re
    with cd('/var/backups/Holzofen'):
        run('find -mtime +365 -exec rm {} \\+')
        d = str(datetime.datetime.utcnow())
        date_slug = re.sub('[^0-9]', '_', d)
        run('mongodump -d holzofen -c firings -o- | gzip -c > %s_mongo.dump.gz' % date_slug)


def _bootstrap():
    _mkchown('/var/www/Holzofen')
    _mkchown('/var/backups/Holzofen')


def _install_virtualenv():
    distribute_installer = 'http://python-distribute.org/distribute_setup.py'
    pip_installer = 'https://raw.github.com/pypa/pip/master/contrib/get-pip.py'
    for url in [distribute_installer, pip_installer]:
        sudo('curl %s | python' % url)
    sudo('pip install virtualenv virtualenvwrapper')
    with cd('/var/www/Holzofen'):
        run('virtualenv --distribute env')


def _install_mongo():
    sudo('echo "deb http://downloads-distro.mongodb.org/repo/ubuntu-upstart dist 10gen" > /etc/apt/sources.list.d/10gen.list')
    sudo('apt-get update && apt-get install mongodb-10gen')


def _install_gevent():
    sudo('aptitude install -y build-essential libevent-dev python-dev')
    with virtualenv():
        run('pip install gevent')


@_contextmanager
def virtualenv():
    with cd(env.directory):
        with prefix(env.activate):
            yield


def _mkchown(path):
    sudo('mkdir -p %s' % path)
    sudo('chown %s:%s %s' % (env.user, env.user, path))
