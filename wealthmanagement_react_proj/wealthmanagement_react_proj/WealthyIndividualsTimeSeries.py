from fake_useragent import UserAgent
import requests
from bs4 import BeautifulSoup
import ssl
import pandas as pd
import django
from django.conf import settings
#from wwealth import wwealth_defaults

settings.configure(DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'wealthDB',
        'USER': 'admin',
        'PASSWORD': 'admin123$',
        'HOST': 'localhost',
        'PORT': '3306',
    }
},DEBUG=True)
django.setup()
print(settings.DATABASES)
from .wwealth.models import *

ssl._create_default_https_context = ssl._create_unverified_context
ua1 = UserAgent()
randomHeader = {'User-Agent':str(ua1.random)}
scrapeLink = 'https://en.wikipedia.org/wiki/The_World%27s_Billionaires#2016'
page = requests.get(scrapeLink, randomHeader)
soup = BeautifulSoup(page.content, 'html.parser')
#print(soup.prettify())
count=range(21);
WealthHeldTS.objects.all().delete()
for x in count:
    year = soup.find_all('h3')[x+1]
    #print(year.text)
    megaTable = soup.find_all('table')[x+2]
    rowValList = []

    for i in range(len(megaTable.find_all('td'))):
        rowVal = megaTable.find_all('td')[i].get_text()
        rowValList.append(rowVal)

    #Sprint(rowValList)
    rankList = []

    for i in range(0, len(rowValList), 6):
        rankList.append(rowValList[i])

    nameList = []
    for i in range(1, len(rowValList), 6):
        nameList.append(rowValList[i])

    networthList = []
    for i in range(2, len(rowValList), 6):
        networthList.append(rowValList[i])

    for y in range(0,len(rankList)):
        wealthheldts = WealthHeldTS()
        if not year.text == '2020':
            wealthheldts.ranking = rankList[y]
            wealthheldts.categoryId = DataCategories.objects.get(name="Billionaires")
            wealthheldts.networth = networthList[y].replace("\n", "").replace(" ", "")
            wealthheldts.year = year.text
            wealthheldts.name = nameList[y]
            wealthheldts.save()


    megaDf = pd.DataFrame()
    megaDf['ranking'] = rankList
    megaDf['name'] = nameList
    megaDf['networth'] = networthList

    print(megaDf)

