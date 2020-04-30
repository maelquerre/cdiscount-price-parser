# Cdiscount price parser

A Cdiscount price parser, written in Python.

For the Python project, go to the [Python project README](cdiscount/README.md).

## Getting started

### Prerequisites

- [Python](https://www.python.org/) 3.6 or higher
- [Node.js](https://nodejs.org/en/) 8.10 or higher

### Installation

1. Clone the repo
```sh
git clone https://github.com/maelquerre/cdiscount-price-parser
```
2. Install dependencies
```sh
npm install
```

#### Installing dependencies for the API

1. Go to the `/api` directory
```sh
cd api/
```
2. Create an environment
```sh
python3 -m venv venv
```
3. Activate the environment
``sh
source venv/bin/activate
``
4. Install the dependencies from the `requirements.txt` file
``sh
pip install -r requirements.txt
``

### Development

The project uses [Python serverless API functions](https://vercel.com/docs/runtimes#advanced-usage/advanced-python-usage) from [Vercel Now](https://vercel.com/docs).

Replicate the Vercel deployment environment locally:
```sh
now dev
```

Start React App in development mode:
```sh
npm start
```

These commands both start a development server on http://localhost:3000.



