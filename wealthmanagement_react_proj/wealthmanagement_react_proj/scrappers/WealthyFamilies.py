from fake_useragent import UserAgent
import requests
from bs4 import BeautifulSoup
import ssl
import pandas as pd
from wwealth.models import * 

ssl._create_default_https_context = ssl._create_unverified_context
ua1 = UserAgent()
randomHeader = {'User-Agent':str(ua1.random)}
scrapeLink = 'https://en.wikipedia.org/wiki/List_of_wealthiest_families#cite_note-10'
page = requests.get(scrapeLink, randomHeader)
soup = BeautifulSoup(page.content, 'html.parser')
#print(soup.prettify())
megaTable = soup.find_all('table')[0]
rowValList = []
for i in range(len(megaTable.find_all('td'))):
        rowVal = megaTable.find_all('td')[i].get_text()
        #print(rowVal)
        rowValList.append(rowVal)

print(rowValList)


nameList = []
for i in range(0, len(rowValList), 5):
    nameList.append(rowValList[i].replace("\n",""))

networthList = []
for i in range(2, len(rowValList), 5):
    networth = rowValList[i].replace("\n","")
    if networth.find("(") != -1:
        networth = networth[:networth.find("(")]
    #print(networth)
    networthList.append(networth)

megaDf = pd.DataFrame()
megaDf['Name'] = nameList
megaDf['Net Worth'] = networthList

print(megaDf)
