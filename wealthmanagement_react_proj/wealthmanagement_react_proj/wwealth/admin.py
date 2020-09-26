from django.contrib import admin
from .models import *

# Register your models here.
admin.site.register(DataCategories)

class WealthHeldAdmin(admin.ModelAdmin):
    model = WealthHeld
    list_display = ('id', 'name', 'ranking','year','categoryId','networth')
    ordering = ['ranking']


admin.site.register(WealthHeld,WealthHeldAdmin)

class WealthHeldTSAdmin(admin.ModelAdmin):
    model = WealthHeldTS
    list_display = ('id', 'name', 'ranking','year','categoryId','networth')
    ordering = ['-year','ranking']


admin.site.register(WealthHeldTS,WealthHeldTSAdmin)
