import re
import calendar
from datetime import datetime, timedelta


class Parser(object):

    FIELD_SEPARATOR = "\t"

    def __init__(self):
        self.plot_data = {}
        self.meta = {
            'date': datetime.utcnow(),
            'duration': 0,
            'max_temp': 0
        }
        self.parse_function = self.__parse_meta
        self.fields = []

    def parse(self, file):
        for line in file.readlines():
            self.parse_function(line)
        return {
            'data': self.plot_data.values(),
            'source': 'log',
            'data_date': self.meta['date'],
            'data_fields': self.fields,
            'duration': self.meta['duration'],
            'max_temp': self.meta['max_temp']
        }

    def __parse_meta(self, line):
        field_parser = {
            'Date': self.__parse_meta_date,
            'Fields': self.__parse_meta_fields,
        }
        # check for separator
        if re.match('^\s*$', line):
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
        self.fields = [f.strip() for f in data.split(',')]
        self.plot_data = dict([(f, {'label': f, 'data': []}) for f in self.fields])

    def __parse_data(self, line):
        time = self.meta['date']
        offset, data = line.split(self.FIELD_SEPARATOR, 1)
        offset = int(offset) * 1000
        self.meta['duration'] = max(self.meta['duration'], offset)
        time += offset

        col = 0
        for temperature in [float(d) for d in data.split(self.FIELD_SEPARATOR)]:
            self.meta['max_temp'] = max(self.meta['max_temp'], temperature)
            field = self.fields[col]
            self.plot_data[field]['data'].append([time, temperature])
            col += 1
