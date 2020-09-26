from rest_framework import serializers
from .models import * 

class WealthHeldSerializer(serializers.ModelSerializer):

    class Meta(object):
        model = WealthHeld
        fields = ('pk','name','ranking','networth','year','categoryId')


class WealthHeldTSSerializer(serializers.ModelSerializer):

    class Meta(object):
        model = WealthHeldTS
        fields = ('pk', 'name','year','ranking','networth','categoryId')
