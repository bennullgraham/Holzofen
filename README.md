Installation
==========

Use git to clone this repository:

```bash
$ git clone https://github.com/bennullgraham/Holzofen.git
````

Requirements
----------

You will need Python 2.7 and [pip](http://guide.python-distribute.org/installation.html#pip-installs-python-pip). At the time of writing, the latest pip could be installed by:

```bash
$ wget http://pypi.python.org/packages/source/p/pip/pip-0.7.2.tar.gz
$ tar xzf pip-0.7.2.tar.gz
$ cd pip-0.7.2
$ python setup.py install
```

Then,

```bash
$ pip install -r requirements.txt
```

MongoDB is also a requirement. See the [Quickstart Guide](http://www.mongodb.org/display/DOCS/Quickstart) for installation instructions (pretty minimal). Holzofen will look for Mongo running on the default port, so after an `apt-get install ...` or equivalent, you are good to go.

Running
==========
Holzofen relies on gevent as a WSGI server, but it isn't listed in the requirements file because it requires python libraries to build. Either figure out how to install gevent, or enable debug mode by creating the following in the root directory of the git clone:

```python
# local-config.py
DEBUG = True
```

Start up Holzofen with the following:


```bash
$ python Holzofen.py
```

... then browse to `http://localhost:5001`

Tests
==========
Run `python setup.py test` yourself, or see results on Travis: [![Build Status](https://secure.travis-ci.org/bennullgraham/Holzofen.png)](http://travis-ci.org/bennullgraham/Holzofen)

Deployment
==========
Clone the project and change into the root dir. Fabric is used to bootstrap and deploy to hosts. Bootstrapping will mess with your `/var/www/Holzofen` and `/var/backups/Holzofen` dirs, install mongo, some build dependencies of gevent, python distribute and pip. Bootstrapping only need occur once.

Deploying will install Holzofen into a virtualenv along with its dependencies. This can be executed again to update Holzofen.

```bash
$ fab -H user@hostname bootstrap
$ fab -H user@hostname pack deploy
```

`Holzofen.py` is in the PATH of this virtualenv, running which will begin serving on port 5001 (by default).

Supervisor
----------
Install Supervisor and add the following stanza to its config. Then, `supervisorctl start holzofen`. This will make sure the Holzofen process stays alive.

```config
[program:holzofen]
environment=PATH="/var/www/Holzofen/env/bin"
command=Holzofen.py
```

Webserver
----------

Following is a basic example of an nginx config for Holzofen. The `X-Pizza-Slices-Remaining` header should be tweaked to suit the local environment.

```nginx
server {
    listen localhost:80;

    server_name holzofen.bgraham.com.au;

    root /var/www/Holzofen;

    add_header              X-Content-Type-Options nosniff;
    add_header              X-Frame-Options SAMEORIGIN;
    add_header              X-Pizza-Slices-Remaining 3;

    # static files
    location ~ ^/static/(.*)$ {
            alias /var/www/Holzofen/static/$1;
            autoindex off;
            expires max;
    }

    # proxy to python app
    location / {
            proxy_set_header "Host" $host;
            proxy_set_header "X-Forwarded-For" $proxy_add_x_forwarded_for;
            proxy_pass      http://localhost:5001/;
    }

    # documentation
    location ~ ^/docs/(.*)$ {
            alias /var/www/Holzofen/docs/$1;
            autoindex off;
    }
}
```