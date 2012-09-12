import holzofen
import unittest
import json
from flask.ext.pymongo import Connection


class TestApiIndex(unittest.TestCase):

    def setUp(self):
        holzofen.app.config['TESTING'] = True
        self.app = holzofen.app.test_client()
        holzofen.api.db = Connection()['holzofen_testing']

    def tearDown(self):
        holzofen.api.db.firings.remove()

    def test_NoFirings(self):
        r = self.app.get('/api/1.0/firings/')
        self.assertEqual('[]', r.data)

    def test_IndexOneFiring(self):
        r = self.app.post('/api/1.0/firings/')
        firing_id = json.loads(r.data)
        r = self.app.get('/api/1.0/firings/')
        firings = json.loads(r.data)

        self.assertEqual(len(firings), 1)

        expected = firing_id
        actual = firings[0]['id']
        self.assertEqual(expected, actual)

    def test_IndexManyFirings(self):
        count = 5
        firing_ids = []
        for n in range(count):
            r = self.app.post('/api/1.0/firings/')
            firing_ids.append(json.loads(r.data))

        r = self.app.get('/api/1.0/firings/')
        firings = json.loads(r.data)
        self.assertEqual(len(firings), count)

        for f in firings:
            assert f['id'] in firing_ids

    def test_IndexMethods(self):
        http_methods = {
            self.app.get: 200,
            self.app.post: 200,
            self.app.put: 405,
            self.app.delete: 405
        }
        for method, expected in http_methods.iteritems():
            r = method('/api/1.0/firings/')
            self.assertEqual(r.status_code, expected)


class TestApiFiring(unittest.TestCase):

    def setUp(self):
        holzofen.app.config['TESTING'] = True
        self.app = holzofen.app.test_client()
        holzofen.api.db = Connection()['holzofen_testing']

        # begin each test with a firing in the DB
        r = self.app.post('/api/1.0/firings/')
        self.firing_id = json.loads(r.data)

    def tearDown(self):
        holzofen.api.db.firings.remove()

    def test_FiringMethods(self):
        http_methods = {
            self.app.get: 200,
            self.app.post: 405,
            # PUT requires ?mode=append for 200, tested elsewhere
            self.app.put: 404,
            self.app.delete: 200
        }
        for method, expected in http_methods.iteritems():
            r = method('/api/1.0/firings/%s' % self.firing_id)
            self.assertEqual(r.status_code, expected)
