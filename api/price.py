from http.server import BaseHTTPRequestHandler
from datetime import datetime
from requests.exceptions import HTTPError
from urllib.parse import urlparse, parse_qs
from cdiscount.price_parser import parse_price


class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        query = parse_qs(urlparse(self.path).query)
        product_sku = query["sku"][0]

        if product_sku is not None:
            try:
                price = parse_price(product_sku)

                if price is None:
                    status_code = 404
                    response = "Product not found."
                else:
                    status_code = 200
                    response = price
            except HTTPError as exception:
                status_code = exception.response.status_code
                response = exception.response.text
        else:
            status_code = 404
            response = "Product not found."

        self.send_response(status_code)
        self.send_header("Content-type", "text/json")
        self.end_headers()
        self.wfile.write(bytes(response, "utf-8"))
        return
