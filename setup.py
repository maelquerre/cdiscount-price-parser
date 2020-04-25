import setuptools

with open("README.md", "r") as fh:
    long_description = fh.read()

setuptools.setup(
    name="cdiscount-pkg-maelquerre", # Replace with your own username
    version="1.0.0",
    author="Maël Querré and Paul Riffard",
    author_email="mael.querre@mail-ecv.fr",
    description="A Cdiscount price parser.",
    long_description=long_description,
    long_description_content_type="text/markdown",
    url="https://github.com/maelquerre/cdiscount",
    packages=setuptools.find_packages(),
    classifiers=[
        "Programming Language :: Python :: 3",
        "License :: OSI Approved :: MIT License",
        "Operating System :: OS Independent",
    ],
    python_requires='>=3.6',
)
