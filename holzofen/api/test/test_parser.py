import unittest
import re
from holzofen.api.parser import LogParser, LiveParser, MissingFieldException, UnknownSeriesException


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
        self.parser = LogParser()
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
        self.parser = LogParser()

    def test_MissingFields(self):
        log = MockFile().without('Fields')
        self.assertRaises(MissingFieldException, self.parser.parse, log)

    def test_MissingDate(self):
        log = MockFile().without('Date')
        # this should raise no exception
        self.parser.parse(log)


class TestLiveParser(unittest.TestCase):

    def setUp(self):
        self.parser = LiveParser()
        self.firing = {
           '_id': {'$oid': '504dd07482e1621783625e76'},
           'data': [
              {
                'data': [[1335018780000, 58.0]],
                'label': 'Oven Temperature'
              },
              {
                 'data': [[1335018780000, 19.0]],
                 'label': 'Brick Temperature'
              }
           ],
           'data_date': 1335018780000,
           'data_fields': ['Oven Temperature', 'Brick Temperature'],
           'log_data': None,
           'source': 'POST'
        }

    def test_InitialSeriesCreate(self):
        form_data = {
            'offset': '0',
            'Oven Temperature': '123.4',
            'Brick Temperature': '987.6'
        }
        self.firing['data_fields'] = []
        self.firing = self.parser.parse(self.firing, form_data)
        actual = self.firing['data']
        expected = [
            {
                'data': [[1335018780000, 123.4]],
                'label': 'Oven Temperature'
            },
            {
                'data': [[1335018780000, 987.6]],
                'label': 'Brick Temperature'
            },
        ]
        self.assertEqual(actual, expected)

    def test_DataAppend(self):
        form_data = {
            'offset': '60',
            'Oven Temperature': '123.4',
            'Brick Temperature': '987.6'
        }
        self.firing = self.parser.parse(self.firing, form_data)
        actual = self.firing['data']
        expected = [
            {
                'data': [[1335018780000, 58.0], [1335018840000, 123.4]],
                'label': 'Oven Temperature'
            },
            {
                'data': [[1335018780000, 19.0], [1335018840000, 987.6]],
                'label': 'Brick Temperature'
            },
        ]
        self.assertEqual(actual, expected)

    def test_UnknownSeries(self):
        form_data = {
            'offset': '60',
            'Rhubarb Temperature': '600.0'
        }
        self.assertRaises(UnknownSeriesException, self.parser.parse, self.firing, form_data)

    def test_MissingOffset(self):
        form_data = {
            'Oven Temperature': '123.4',
            'Brick Temperature': '987.6'
        }
        self.assertRaisesRegexp(
            MissingFieldException, 'offset missing from submitted data',
            self.parser.parse, self.firing, form_data
        )
