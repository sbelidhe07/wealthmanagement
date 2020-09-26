import lxml.html
from urllib.request import Request, urlopen
from bs4 import BeautifulSoup as soup
import ssl

ssl._create_default_https_context = ssl._create_unverified_context


url = 'https://www.bloomberg.com/features/richest-families-in-the-world/'
req = Request(url, headers={'User-Agent': 'Mozil.next_siblingla/5.0'})

webpage = urlopen(req).read()
page_soup = soup(webpage, features='lxml')
#print(page_soup.prettify())
for item in page_soup.find_all('div', {'class': 'info'}):
            name = item.find('div', {'class': 'third'}).text
            #print(name.replace(" ","").replace("Name",""))
            net_worth = item.find('div', {'class': 'sm'}).text
            print(name.replace(" ","").replace("Name","").replace("\n","") + "--" + net_worth.replace(" ","").replace("Wealth","").replace("\n",""))
