import lxml.html
from urllib.request import Request, urlopen
from bs4 import BeautifulSoup as soup
import ssl

ssl._create_default_https_context = ssl._create_unverified_context


url = 'https://www.statista.com/statistics/263264/top-companies-in-the-world-by-market-value/'
req = Request(url, headers={'User-Agent': 'Mozilla/5.0'})

webpage = urlopen(req).read()
page_soup = soup(webpage, features='lxml')
#print(page_soup.prettify())
i = 0
for item in page_soup.find('tbody').findChildren():
                if item.find('td') is not None:
                    items = item.find_all('td')
                    print(items[i].text.strip()+" : " + items[i+1].text)




