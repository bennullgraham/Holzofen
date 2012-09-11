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
----------
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
----------
Run `python setup.py test` yourself, or see results on Travis: [![Build Status](https://secure.travis-ci.org/bennullgraham/Holzofen.png)](http://travis-ci.org/bennullgraham/Holzofen)
