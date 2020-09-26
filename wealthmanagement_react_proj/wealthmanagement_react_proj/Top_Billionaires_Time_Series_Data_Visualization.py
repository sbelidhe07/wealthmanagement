from fake_useragent import UserAgent
import requests
from bs4 import BeautifulSoup
import ssl
import pandas as pd
import matplotlib.pyplot as plt; plt.rcdefaults()
import matplotlib.dates as mdates
import numpy as np
import django
from django.conf import settings
#from wwealth import wwealth_defaults

#settings.configure(DATABASES = {
 #   'default': {
  #      'ENGINE': 'django.db.backends.mysql',
   #     'NAME': 'wealthDB',
    #    'USER': 'admin',
     #   'PASSWORD': 'admin123$',
      #  'HOST': 'localhost',
       # 'PORT': '3306',
    #}
#},DEBUG=True)
#django.setup()
#print(settings.DATABASES)
#from wwealth.models import *

ssl._create_default_https_context = ssl._create_unverified_context
ua1 = UserAgent(use_cache_server=False)
randomHeader = {'User-Agent':str(ua1.random)}
scrapeLink = 'https://en.wikipedia.org/wiki/The_World%27s_Billionaires#2016'
page = requests.get(scrapeLink, randomHeader)
soup = BeautifulSoup(page.content, 'html.parser')
#print(soup.prettify())
count=range(21);
#models.WealthHeldTS.objects.all().delete()
yearList = []
totalNetWorthList =[]

for x in count:
    year = soup.find_all('h3')[x+1]
    #print(year.text)
    megaTable = soup.find_all('table')[x+2]
    rowValList = []


    yearList.append(int(year.text))
    for i in range(len(megaTable.find_all('td'))):
        rowVal = megaTable.find_all('td')[i].get_text()
        rowValList.append(rowVal)

    #print(rowValList)
    rankList = []

    for i in range(0, len(rowValList), 6):
        rankList.append(rowValList[i])

    nameList = []
    for i in range(1, len(rowValList), 6):
        nameList.append(rowValList[i])

    networthList = []
    for i in range(2, len(rowValList), 6):
        networthList.append(float(rowValList[i].replace("\n", "").replace(" ", "").replace("$","").replace("billion","").replace('\xa0', ' ').strip()))

    totalNetWorthList.append(sum(map(float,networthList)))

    megaDf = pd.DataFrame()
    megaDf['ranking'] = rankList
    megaDf['name'] = nameList
    megaDf['networth'] = networthList

    #print(megaDf)

df = pd.DataFrame()

df['year'] = np.round(yearList)
df['total'] = np.round(totalNetWorthList)

df.plot.bar(x="year", y="total", rot=70, title="Year Wise Billionaire Net Worth total")

plt.show()
