import setuptools

setuptools.setup(
    name="cdiscount-price-parser-pkg-maelquerre",
    version="1.0.0",
    author="Maël Querré and Paul Riffard",
    description="A Cdiscount product price parser.",
    long_description_content_type="text/markdown",
    url="https://github.com/maelquerre/cdiscount",
    packages=setuptools.find_packages(),
    install_requires=[
        'requests',
        'beautifulsoup4'
    ],
    python_requires='>=3.6',
)
