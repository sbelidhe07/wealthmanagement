import lxml.html
from urllib.request import Request, urlopen
from bs4 import BeautifulSoup as soup
import ssl
ssl._create_default_https_context = ssl._create_unverified_context


url = 'https://www.tharawat-magazine.com/facts/top-5-richest-nonprofit-organizations/'
req = Request(url, headers={'User-Agent': 'Mozilla/5.0'})

webpage = urlopen(req).read()
page_soup = soup(webpage, features='lxml')
# print(page_soup.prettify())
div = page_soup.find('div',{'class': 'td-post-content'})
for element in div.findChildren():
            if element.name == 'h2':
                    print(element.strong.text)
            if element.name == 'h3':
                    if(element.strong.text.find("Country of Origin")) == -1:
                                print(element.strong.text)
