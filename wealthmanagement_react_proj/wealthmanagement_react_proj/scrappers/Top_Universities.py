import lxml.html
import urllib.request as urllib2
from bs4 import BeautifulSoup
import ssl
import re

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE
browser = urllib2.build_opener(urllib2.HTTPSHandler(context=ctx))
html = browser.open(
   'https://www.workandmoney.com/s/largest-university-endowments-5b629e22f6fc4046'
).read()
bsObj = BeautifulSoup(html, features='lxml')

for heading2 in bsObj.find_all(['section'])[1:]:
        if heading2.article.a is not None:
                if(heading2.article.a.text.find("$")) != -1:
                            print(heading2.h2.text.strip() + "-" + heading2.article.a.text.strip())

