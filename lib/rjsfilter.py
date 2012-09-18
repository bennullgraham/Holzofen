from webassets.filter import Filter
from subprocess import check_output
from tempfile import NamedTemporaryFile
import os


class RjsFilter(Filter):
    name = 'rjs'

    def input(self, _in, out, **kwargs):
        baseUrl = os.path.dirname(kwargs['source_path'])
        with NamedTemporaryFile(delete=False) as tmp:
            cmd = [
                'r.js', '-o',
                'baseUrl=%s' % baseUrl,
                'name=main',
                'paths.jquery=lib/jquery',
                'out=%s' % tmp.name
            ]
            tmp.close()
            check_output(cmd)

        with open(tmp.name) as res:
            out.write(res.read())
            os.unlink(tmp.name)
