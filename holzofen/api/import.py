import re
import time
from datetime import datetime


class Parser(object):

    FIELD_SEPARATOR = "\t"

    def __init__(self):
        self.plot_data = {}
        self.meta = {}
        self.meta['date'] = datetime.now()
        self.parse_function = self.__parse_meta

    def parse(self, str):
        for line in str.split("\n"):
            self.parse_function(line)
        return self.plot_data

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
        self.meta['date'] = time.mktime(dt.timetuple())  # POSIX time

    def __parse_meta_fields(self, field, data):
        fields = [f.strip() for f in data.split(',')]
        self.plot_data = [{'label': f, 'data': []} for f in fields]

    def __parse_data(self, line):
        time = self.meta['date']
        offset, data = line.split(self.FIELD_SEPARATOR, 1)
        time += int(offset)
        col = 0
        for temperature in [float(d) for d in data.split(self.FIELD_SEPARATOR)]:
            self.plot_data[col]['data'].append([time, temperature])
            col += 1
