from requests.exceptions import HTTPError
from .cdiscount.price_parser import parse_price
from flask import Flask, request

app = Flask(__name__)


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def index(path):
    product_sku = request.args["sku"]

    if product_sku is not None:
        try:
            price = parse_price(product_sku)

            if price is None:  # The product could not be found
                status = 404
                response = "Product not found."
            else:
                status = 200
                response = price
        except HTTPError as exception:
            status = exception.response.status_code
            response = exception.response.text
    else:
        status = 404
        response = "Product not found."

    return response, status, {"Content-type": "text/json"}
