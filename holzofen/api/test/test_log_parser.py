import unittest
import re
from holzofen.api.log_parser import Parser, MissingFieldException

class MockFile(object):
    def __init__(self):
        here = __file__.rsplit('/', 1)[0]
        self.lines = open('%s/firing.log' % here, 'r').readlines()

    def without(self, regex):
        self.lines = [l for l in self.lines if not re.match(regex, l)]
        return self

    def readlines(self):
        return self.lines


class TestLogParser(unittest.TestCase):

    def setUp(self):
        self.parser = Parser()
        self.log = MockFile()
        self.output = self.parser.parse(self.log)

    def test_Fields(self):
        expected = ['Brick Temperature', 'Oven Temperature', 'Chimney Temperature']
        actual = self.parser.meta['fields']
        self.assertEqual(expected, actual)

    def test_Date(self):
        expected = 1346960794000
        actual = self.output['data_date']
        self.assertEqual(expected, actual)

    def test_Duration(self):
        expected = 30000
        actual = self.output['duration']
        self.assertEqual(expected, actual)

    def test_MaxTemp(self):
        expected = 53.1
        actual = self.output['max_temp']
        self.assertEqual(expected, actual)

    def test_Series(self):
        expected = [
            {'data': [[1346960794000, 20.0], [1346960809000, 22.1], [1346960824000, 24.4]], 'label': 'Brick Temperature'}, 
            {'data': [[1346960794000, 40.0], [1346960809000, 45.8], [1346960824000, 53.1]], 'label': 'Oven Temperature'}, 
            {'data': [[1346960794000, 31.3], [1346960809000, 40.8], [1346960824000, 49.7]], 'label': 'Chimney Temperature'}
        ]
        actual = self.output['data']
        self.assertEqual(expected, actual)

class TestLogParserMissingMeta(unittest.TestCase):

    def setUp(self):
        self.parser = Parser()

    def test_MissingFields(self):
        log = MockFile().without('Fields')
        self.assertRaises(MissingFieldException, self.parser.parse, log)

    def test_MissingDate(self):
        log = MockFile().without('Date')
        # this should raise no exception
        self.parser.parse(log)
