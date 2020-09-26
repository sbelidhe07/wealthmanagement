from django.db import models

class BaseModel(models.Model):

    class Meta:
        abstract = True  # specify this model as an Abstract Model
        app_label = 'wwealth'

class DataCategories(BaseModel):
    name = models.CharField(max_length=240)

    def __str__(self):
        return self.name

class WealthHeld(BaseModel):
    name = models.CharField(max_length=240)
    year = models.IntegerField(default=0, blank=True, editable=False)
    ranking= models.IntegerField(default=0, blank=True, editable=False)
    networth= models.CharField(max_length=255)
    marketvalue= models.CharField(max_length=255)
    revenue= models.CharField(max_length=255)
    categoryId = models.ForeignKey(DataCategories,on_delete=models.CASCADE,db_column='categoryId')

    def __str__(self):
        return self.name

class WealthHeldTS(BaseModel):
    name = models.CharField(max_length=240)
    year = models.IntegerField(default=0, blank=True, editable=False)
    ranking= models.IntegerField(default=0, blank=True, editable=False)
    networth= models.CharField(max_length=255)
    marketvalue= models.CharField(max_length=255)
    revenue= models.CharField(max_length=255)
    categoryId = models.ForeignKey(DataCategories,on_delete=models.CASCADE,db_column='categoryId')

    def __str__(self):
        return self.name
