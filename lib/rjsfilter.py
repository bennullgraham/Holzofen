from webassets.filter import Filter
from subprocess import check_output
from tempfile import NamedTemporaryFile
import os


class RjsFilter(Filter):
    name = 'rjs'

    def output(self, _in, out, **kwargs):
        out.write(_in.read())

    def input(self, _in, out, **kwargs):
        baseUrl = os.path.dirname(kwargs['source_path'])
        tmp = NamedTemporaryFile()
        cmd = [
            'r.js', '-o',
            'baseUrl=%s' % baseUrl,
            'name=main',
            'paths.jquery=lib/jquery',
            'out=%s' % tmp.name
        ]
        print ' '.join(cmd)
        print cmd
        if check_output(cmd):
            print "output OK!"
            out.write(tmp.read())
        else:
            print "output not OK!"
