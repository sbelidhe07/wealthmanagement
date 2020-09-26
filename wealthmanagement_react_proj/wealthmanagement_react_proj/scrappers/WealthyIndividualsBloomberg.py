import lxml.html
from urllib.request import Request, urlopen
from bs4 import BeautifulSoup as soup
import ssl

ssl._create_default_https_context = ssl._create_unverified_context


url = 'https://www.bloomberg.com/billionaires/'
req = Request(url, headers={'User-Agent': 'Mozilla/5.0'})

webpage = urlopen(req).read()
page_soup = soup(webpage, features='lxml')
#print(page_soup.prettify())
for item in page_soup.find_all('div', {'class': 'table-row'}):
            name = item.find('div', {'class': 'table-cell t-name'}).a.text
            net_worth = item.find('div', {'class': 'table-cell active t-nw'}).text
            print(name.strip() + "--" + net_worth.strip())

