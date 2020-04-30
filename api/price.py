from http.server import BaseHTTPRequestHandler
from datetime import datetime
from urllib.parse import urlparse, parse_qs
from cdiscount.price_parser import parse_price


class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        query = parse_qs(urlparse(self.path).query)
        product_sku = query["sku"][0]

        if product_sku is not None:
            price = parse_price(product_sku)
            if price is not None:
                status_code = 200
                message = price
            else:
                status_code = 404
                message = "Product not found."
        else:
            status_code = 404
            message = "Product not found."

        self.send_response(status_code)
        self.send_header("Content-type", "text/json")
        self.end_headers()
        self.wfile.write(bytes(message, "utf-8"))
        return
