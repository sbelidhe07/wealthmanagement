"""wealthmanagement_react_proj URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from .wwealth import views
from django.conf.urls import url

urlpatterns = [
    path('admin/', admin.site.urls),
    url(r'^api/all/$', views.all_list),
    url(r'^api/tsall/$', views.tsall_list),
    url(r'^api/wheldinfo/$', views.wealthheld_list),
    url(r'^api/wheldtsinfo/$', views.wealthheldts_list),
    url(r'^api/wheldinfo/([0-9]+)/$', views.wealthheld_category),
    url(r'^api/wheldtsinfo/([0-9]+)/$', views.wealthheldts_year),
    url(r'^api/wheldtsinfo/([0-9]+)/([0-9]+)/$', views.wealthheldts_year_category),
]
