import re
import calendar
from datetime import datetime


class MissingFieldException(Exception):
    pass


class Parser(object):

    FIELD_SEPARATOR = "\t"

    def __init__(self):
        self.plot_data = {}
        self.meta = {
            'date': calendar.timegm(datetime.utcnow().timetuple()),
            'duration': 0,
            'max_temp': 0
        }
        self.parse_function = self.__parse_meta

    def parse(self, file):
        lines = []
        for line in file.readlines():
            lines.append(line)
            self.parse_function(line)
        return {
            'data': self.plot_data.values(),
            'source': 'log',
            'data_date': self.meta['date'],
            'data_fields': self.meta['fields'],
            'duration': self.meta['duration'],
            'max_temp': self.meta['max_temp'],
            'log_data': lines
        }

    def __parse_meta(self, line):
        field_parser = {
            'Date': self.__parse_meta_date,
            'Fields': self.__parse_meta_fields,
        }
        # empty line signals transition from metadata to data
        if re.match('^\s*$', line):
            self.__check_required_meta_fields()
            self.parse_function = self.__parse_data
        else:
            tokens = line.split(':', 1)
            if len(tokens) == 2:
                field, data = [t.strip() for t in tokens]
                if field in field_parser.keys():
                    field_parser[field](field, data)

    def __parse_meta_date(self, field, data):
        y, mo, d, h, mi, s = [int(t) for t in data.split(' ')]
        dt = datetime(y, mo, d, h, mi, s)
        self.meta['date'] = calendar.timegm(dt.timetuple()) * 1000  # Javascript UTC timestamp (POSIX, but in milliseconds)

    def __parse_meta_fields(self, field, data):
        self.meta['fields'] = [f.strip() for f in data.split(',')]
        self.plot_data = dict([(f, {'label': f, 'data': []}) for f in self.meta['fields']])

    def __parse_data(self, line):
        time = self.meta['date']
        offset, data = line.split(self.FIELD_SEPARATOR, 1)
        offset = int(offset) * 1000
        self.meta['duration'] = max(self.meta['duration'], offset)
        time += offset

        col = 0
        for temperature in [float(d) for d in data.split(self.FIELD_SEPARATOR)]:
            self.meta['max_temp'] = max(self.meta['max_temp'], temperature)
            field = self.meta['fields'][col]
            self.plot_data[field]['data'].append([time, temperature])
            col += 1

    def __check_required_meta_fields(self):
        required = ['fields']
        for r in required:
            if not r in self.meta:
                raise MissingFieldException("Field '%s' missing from log file header" % r)