import setuptools

with open("README.md", "r") as fh:
    long_description = fh.read()

setuptools.setup(
    name="cdiscount-pkg-maelquerre",
    version="1.0.0",
    author="Maël Querré and Paul Riffard",
    description="A Cdiscount product price parser.",
    long_description=long_description,
    long_description_content_type="text/markdown",
    url="https://github.com/maelquerre/cdiscount",
    packages=setuptools.find_packages(),
    install_requires=[
        'requests',
        'beautifulsoup4'
    ],
    python_requires='>=3.6',
)
