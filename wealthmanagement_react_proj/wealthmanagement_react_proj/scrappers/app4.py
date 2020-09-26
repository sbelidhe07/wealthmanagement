from urllib.request import Request, urlopen
from bs4 import BeautifulSoup as soup
import ssl
ssl._create_default_https_context = ssl._create_unverified_context


url = 'https://thebestschools.org/features/richest-universities-endowments-generosity-research/'
req = Request(url, headers={'User-Agent': 'Mozilla/5.0'})

webpage = urlopen(req).read()
page_soup = soup(webpage, features='lxml')
print(page_soup.prettify())