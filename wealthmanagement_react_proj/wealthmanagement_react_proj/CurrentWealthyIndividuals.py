from fake_useragent import UserAgent
import requests
import ssl
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

from .wwealth.models import *

ssl._create_default_https_context = ssl._create_unverified_context
ua1 = UserAgent()
randomHeader = {'User-Agent':str(ua1.random)}
response = requests.get('https://forbes400.herokuapp.com/api/forbes400/?limit=10')
forbesdata = response.json()
#print(forbesdata)
WealthHeld.objects.all().delete()
for x in range(0,len(forbesdata)):
    wealthheld = WealthHeld()
    wealthheld.categoryId = DataCategories.objects.get(name="Billionaires")
    wealthheld.year = '2020'
    wealthheld.ranking = forbesdata[x]['position']
    wealthheld.name = forbesdata[x]['personName']
    wealthheld.networth = "$" + str(round(((forbesdata[x]['finalWorth']/1000)*100)/100)) + " billion"
    wealthheld.save()
