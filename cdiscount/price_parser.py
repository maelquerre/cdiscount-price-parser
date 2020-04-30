import requests
from bs4 import BeautifulSoup


def parse_price(sku):
    """
    Parse a product page and return its price.

    :param sku: The unique identifier for the product
    :return: The price of the product

    >>> parse_price("del5397184246030")
    1776.60
    """
    url = "https://www.cdiscount.com/f-0-" + sku + ".html"
    main_price_class = "fpPrice price jsMainPrice jsProductPrice hideFromPro"

    response = requests.get(url)
    response.raise_for_status()

    soup = BeautifulSoup(response.content, 'html.parser')
    price_element = soup.find(class_=main_price_class)

    return float(price_element["content"]) if price_element else None
