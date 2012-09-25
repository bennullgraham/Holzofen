import os
from unittest import defaultTestLoader


here = os.path.basename(__file__)
suite = defaultTestLoader.discover('%s/..' % here)
