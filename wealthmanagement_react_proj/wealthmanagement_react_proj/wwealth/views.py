from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from .models import *
from .serializers import *


@api_view(['GET'])
def all_list(request):


#List wealth held details.


    if request.method == 'GET':
      wheldinfo = WealthHeld.objects.all()

      serializer = WealthHeldSerializer(wheldinfo,context={'request': request} ,many=True)
      return Response({'data': serializer.data})

@api_view(['GET'])
def tsall_list(request):

#List wealth held time series details.

    if request.method == 'GET':
      wheldtsinfo = WealthHeldTS.objects.all()

      serializer = WealthHeldTSSerializer(wheldtsinfo,context={'request': request} ,many=True)
      return Response({'data': serializer.data})


@api_view(['GET'])
def tsall_list_year(request,year):

#List wealth held time series details.

    if request.method == 'GET':
      wheldtsinfo = WealthHeldTS.objects.filter(year=year)

      serializer = WealthHeldTSSerializer(wheldtsinfo,context={'request': request} ,many=True)
      return Response({'data': serializer.data})



@api_view(['GET'])
def wealthheld_list(request):


#List wealth held details.


    if request.method == 'GET':
      data = []
      nextPage = 1
      previousPage = 1
      wheldinfo = WealthHeld.objects.all()
      page = request.GET.get('page', 1)
      paginator = Paginator(wheldinfo, 5)
      try:
          data = paginator.page(page)
      except PageNotAnInteger:
          data = paginator.page(1)
      except EmptyPage:
          data = paginator.page(paginator.num_pages)

      serializer = WealthHeldSerializer(data,context={'request': request} ,many=True)
      print(serializer.data)
      if data.has_next():
          nextPage = data.next_page_number()
      if data.has_previous():
          previousPage = data.previous_page_number()
      print(nextPage)
      return Response({'data': serializer.data , 'count': paginator.count, 'numpages' : paginator.num_pages, 'nextlink': '/api/wheldinfo/?page=' + str(nextPage), 'prevlink': '/api/wheldinfo/?page=' + str(previousPage)})


@api_view(['GET'])
def wealthheldts_list(request):


#List wealth time series held details.


    if request.method == 'GET':
      data = []
      nextPage = 1
      previousPage = 1
      wheldtsinfo = WealthHeldTS.objects.all()
      page = request.GET.get('page', 1)
      paginator = Paginator(wheldtsinfo, 10)
      try:
          data = paginator.page(page)
      except PageNotAnInteger:
          data = paginator.page(1)
      except EmptyPage:
          data = paginator.page(paginator.num_pages)

      serializer = WealthHeldTSSerializer(data,context={'request': request} ,many=True)
      print(serializer.data)
      if data.has_next():
          nextPage = data.next_page_number()
      if data.has_previous():
          previousPage = data.previous_page_number()
      print(nextPage)
      return Response({'data': serializer.data , 'count': paginator.count, 'numpages' : paginator.num_pages, 'nextlink': '/api/wheldtsinfo/?page=' + str(nextPage), 'prevlink': '/api/wheldtsinfo/?page=' + str(previousPage)})



@api_view(['GET'])
def wealthheld_category(request,cid ):

#Retrieve wealth held by category id.


    if request.method == 'GET':
      data = []
      nextPage = 1
      previousPage = 1
      wheldinfo = WealthHeld.objects.filter(categoryId=cid)
      page = request.GET.get('page', 1)
      paginator = Paginator(wheldinfo, 5)
      try:
          data = paginator.page(page)
      except PageNotAnInteger:
          data = paginator.page(1)
      except EmptyPage:
          data = paginator.page(paginator.num_pages)
      except WealthHeld.DoesNotExist:
          return Response(status=status.HTTP_404_NOT_FOUND)

      serializer = WealthHeldSerializer(data,context={'request': request},many=True)
      if data.has_next():
          nextPage = data.next_page_number()
      if data.has_previous():
          previousPage = data.previous_page_number()

      return Response({'data': serializer.data , 'count': paginator.count, 'numpages' : paginator.num_pages, 'nextlink': '/api/wheldinfo/' +str(cid) +'/?page=' + str(nextPage), 'prevlink': '/api/wheldinfo/' + str(cid) + '/?page=' + str(previousPage)});


@api_view(['GET'])
def wealthheldts_year(request,year):

#Retrieve wealth held by year.


    if request.method == 'GET':
      data = []
      nextPage = 1
      previousPage = 1
      wheldtsinfo = WealthHeldTS.objects.filter(year=year)
      page = request.GET.get('page', 1)
      paginator = Paginator(wheldtsinfo, 5)
      try:
          data = paginator.page(page)
      except PageNotAnInteger:
          data = paginator.page(1)
      except EmptyPage:
          data = paginator.page(paginator.num_pages)
      except WealthHeldTS.DoesNotExist:
          return Response(status=status.HTTP_404_NOT_FOUND)

      serializer = WealthHeldTSSerializer(data,context={'request': request},many=True)
      if data.has_next():
          nextPage = data.next_page_number()
      if data.has_previous():
          previousPage = data.previous_page_number()

      return Response({'data': serializer.data , 'count': paginator.count, 'numpages' : paginator.num_pages, 'nextlink': '/api/wheldtsinfo/' + str(year) + '/?page=' + str(nextPage), 'prevlink': '/api/wheldtsinfo/' + str(year) + '/?page=' + str(previousPage)})

@api_view(['GET'])
def wealthheldts_year_category(request,year,cid):

#Retrieve wealth held by year and categoryId.


    if request.method == 'GET':
       data = []
       nextPage = 1
       previousPage = 1
       wheldtsinfo = WealthHeldTS.objects.filter(year=year,categoryId=cid)
       page = request.GET.get('page', 1)
       paginator = Paginator(wheldtsinfo, 5)
       try:
           data = paginator.page(page)
       except PageNotAnInteger:
           data = paginator.page(1)
       except EmptyPage:
           data = paginator.page(paginator.num_pages)
       except WealthHeldTS.DoesNotExist:
           return Response(status=status.HTTP_404_NOT_FOUND)

       serializer = WealthHeldTSSerializer(data,context={'request': request},many=True)
       if data.has_next():
           nextPage = data.next_page_number()
       if data.has_previous():
           previousPage = data.previous_page_number()

       return Response({'data': serializer.data , 'count': paginator.count, 'numpages' : paginator.num_pages, 'nextlink': '/api/wheldtsinfo/' + str(year) + '/' + str(cid) + '/?page=' + str(nextPage), 'prevlink': '/api/wheldtsinfo/' + str(year) + '/' + str(cid) + '/?page=' + str(previousPage)})
