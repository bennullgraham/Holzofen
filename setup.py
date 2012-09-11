from setuptools import setup, find_packages

setup(
    name='Holzofen',
    version='0.0.1',
    url='http://holzofen.bgraham.com.au',
    author='Ben Graham',
    author_email='bgraham@bgraham.com.au',
    description='Live reporting of pizza oven temperatures!',
    long_description=open('README.md').read(),
    packages=find_packages(exclude="test*.py"),
    include_package_data=True,
    zip_safe=False,
    platforms='any',
    install_requires=open('requirements.txt').read(),
    scripts=['Holzofen.py'],
    test_suite="test_loader.suite"
)
