from datetime import datetime

example = """Date: 2012 09 06 19 46 34
Fields: Brick Temperature, Oven Temperature

0   20.0    40.0
15  22.1    45.8
30  24.4    53.1"""


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

    def __parse_meta(self, line):
        allowed_fields = {
            'required': ['Fields'],
            'optional': ['Date'],
        }
        field, data = line.split(':', 1)
        if field in allowed_fields['required'] or field in allowed_fields['optional']:
            if field == 'Date':
                y, m, d, h, m, s = data.split(' ')
                self.meta['date'] = datetime.datetime(y, m, d, h, m, s)



print Parser().parse(example)
