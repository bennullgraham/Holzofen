from setuptools import setup, find_packages


def gen_data_files(*dirs):
    import os
    results = []

    for src_dir in dirs:
        for root, dirs, files in os.walk(src_dir):
            results.append((root, map(lambda f: root + "/" + f, files)))
    return results


setup(
    name='Holzofen',
    version='0.0.1',
    url='http://holzofen.bgraham.com.au',
    author='Ben Graham',
    author_email='bgraham@bgraham.com.au',
    description='Live reporting of pizza oven temperatures!',
    long_description=open('README.md').read(),
    packages=find_packages(),  # exclude="test*.py"),
    include_package_data=True,
    zip_safe=False,
    platforms='any',
    install_requires=open('requirements.txt').read(),
    scripts=['Holzofen.py'],
    test_suite="holzofen.test_loader.suite",
)
