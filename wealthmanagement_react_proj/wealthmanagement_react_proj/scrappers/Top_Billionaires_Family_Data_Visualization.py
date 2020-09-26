from fake_useragent import UserAgent
import requests
from bs4 import BeautifulSoup
import ssl
import pandas as pd
#import matplotlib.pyplot as plt
import matplotlib.pyplot as plt; plt.rcdefaults()
import numpy as np

ssl._create_default_https_context = ssl._create_unverified_context
ua1 = UserAgent()
randomHeader = {'User-Agent':str(ua1.random)}
scrapeLink = 'https://www.bloombergquint.com/labs/richest-families-in-the-world/'
page = requests.get(scrapeLink, randomHeader)
soup = BeautifulSoup(page.content, 'html.parser')
#print(soup.prettify())
count = range(48)
rowValList = []
rankList = []
y = 0
for x in count:
    if y > 48:
        break
    y = y + 1
    megaTable = soup.find_all('table')[y]
    #print(y)
    for i in range(len(megaTable.find_all('td'))):
        rowVal = megaTable.find_all('td')[i].get_text()
        #print(rowVal)
        rowValList.append(rowVal)
    y = y + 1
#print(rowValList)

#rankList = []
#for i in range(0, len(rowValList), 7):
    #rankList.append(rowValList[i].replace("\n",""))

nameList = []
for i in range(0, len(rowValList), 6):
    name = rowValList[i].replace("\n","").replace("Name","")
    if name.rfind(",") != -1:
        name = name[name.rfind(",")+1:len(name)].strip()
    nameList.append(name)

networthList = []
for i in range(3, len(rowValList), 6):
    networthList.append(float(rowValList[i].replace("\n","").replace("Wealth","").replace("$","").replace("bn","").replace("WEALTH","")))

#print(networthList)

megaDf = pd.DataFrame()
megaDf['name'] = nameList
megaDf['networth'] = networthList
megaDf['networth'].apply(np.floor)
#print(c)
megaDf.sort_values(by=['networth'], inplace=True,ascending=False)
rankList = range(1,len(megaDf)+1)
megaDf['ranking'] = rankList
print(megaDf)
#print(pd.isnull(megaDf).any())
#megaDf.plot(kind='scatter',x='name',y='networth')
#x = megaDf.name
#y_pos = np.arange(len(megaDf.networth))
#y = megaDf.networth
#plt.barh(y_pos, x, 0.85, alpha=0.5)
#plt.yticks(y_pos,y)
#plt.invert_yaxis()
#3plt.xlabel('Name')
#plt.ylabel('Net Worth')
#3plt.title('Billionaires Family')

#print(nameList)

#for i in range(len(megaDf.ranking)): # your number of bars
 #   plt.text(x = nameList[i],  #takes your x values as horizontal positioning argument
  #  y= networthList[i] + 1 , #takes your y values as vertical positioning argument
   # s=rankList[i], # the labels you want to add to the data
    #size=9) # font size of datalabels

#plt.show()
#plt.scatter(x, y)
#plt.show()

megaDf.plot.bar(x="name", y="networth", rot=100, title="Billionaire's Family")

for index, value in enumerate(rankList):
    plt.text(0.001+index,0.01+value,str(value))

plt.show()



