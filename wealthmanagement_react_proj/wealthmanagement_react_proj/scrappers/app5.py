
from lxml import html
from urllib.request import Request, urlopen
from bs4 import BeautifulSoup as soup
import requests
import ssl


ssl._create_default_https_context = ssl._create_unverified_context

page = requests.get('https://www.crunchbase.com/#/home/index')


page_soup = soup(page.content, features='lxml')
print(page_soup.prettify())
