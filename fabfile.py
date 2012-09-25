from fabric.api import *
from contextlib import contextmanager as _contextmanager

# the user to use for the remote commands
env.user = 'bgraham'
env.use_ssh_config = True
env.hosts = ['gvm']
env.directory = '/var/www/Holzofen'
env.activate = 'source /var/www/Holzofen/env/bin/activate'


def configure():
    local('if [ ! -z holzofen/build.env.py ]; then rm holzofen/build-env.py; fi')

    # write git revision to config so we can display it without
    # installing git on production machine
    local('echo "GIT_REV = \'$(git rev-parse --short HEAD)\'" >> holzofen/build-env.py')


def pack():
    # build docs
    local('make --directory=docs html')

    # (re)build assets
    local('python manage.py assets_rebuild')

    # create a new source distribution as tarball
    local('python setup.py sdist --formats=gztar', capture=False)


def deploy():
    # figure out the release name and version
    dist = local('python setup.py --fullname', capture=True).strip()
    # upload the source tarball to the temporary folder on the server
    put('dist/%s.tar.gz' % dist, '/tmp/Holzofen.tar.gz')
    # create a place where we can unzip the tarball, then enter that
    # directory and unzip it
    run('mkdir -p /tmp/Holzofen && rm -rf /tmp/Holzofen/*')
    # with cd('/var/www/Holzofen'):
        # backup the database
        # run('mongodump -d holzofen -c firings -o- | gzip -c > mongo.dump.gz')
    with cd('/tmp/Holzofen'):
        run('tar --strip-components=1 -xzf /tmp/Holzofen.tar.gz')
        # now setup the package with our virtual environment's python
        # interpreter
        run('/var/www/Holzofen/env/bin/python setup.py install')
    # now that all is set up, delete the folder again
    run('rm -rf /tmp/Holzofen /tmp/Holzofen.tar.gz')
    # touch the .wsgi file to trigger a reload of the application
    run('touch /var/www/Holzofen/Holzofen.py')


def bootstrap():
    install_virtualenv()
    sudo('mkdir -p /var/www/Holzofen')
    sudo('chown %s:%s /var/www/Holzofen' % (env.user, env.user))

    with cd('/var/www/Holzofen'):
        run('virtualenv --distribute env')


def install_virtualenv():
    distribute_installer = 'http://python-distribute.org/distribute_setup.py'
    pip_installer = 'https://raw.github.com/pypa/pip/master/contrib/get-pip.py'
    for url in [distribute_installer, pip_installer]:
        sudo('curl %s | python' % url)
    sudo('pip install virtualenv virtualenvwrapper')


def install_gevent():
    sudo('aptitude install -y build-essential libevent-dev python-dev')
    with virtualenv():
        run('pip install gevent')


@_contextmanager
def virtualenv():
    with cd(env.directory):
        with prefix(env.activate):
            yield
