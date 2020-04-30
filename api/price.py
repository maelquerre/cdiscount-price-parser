from http.server import BaseHTTPRequestHandler
from datetime import datetime
import urllib.parse
from cdiscount.price_parser import parse_price


class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        print('yes')
        query = urllib.parse.parse_qs(self.path)
        product_sku = query["sku"][0]

        if not product_sku:
            self.send_response(404)
            self.send_header("Content-type", "text/plain")
            self.end_headers()
            self.wfile.write("Product not found.")
            return

        price = parse_price(product_sku)

        if not price:
            self.send_response(404)
            self.send_header("Content-type", "text/plain")
            self.end_headers()
            self.wfile.write("Product not found.")
            return

        self.send_response(200)
        self.send_header("Content-type", "text/plain")
        self.end_headers()
        self.wfile.write(price)
        return
