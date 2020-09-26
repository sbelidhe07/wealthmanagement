# Generated by Django 3.1 on 2020-08-31 21:56

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='DataCategories',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255, verbose_name='Name')),
            ],
        ),
        migrations.CreateModel(
            name='WealthHeldTS',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255, verbose_name='Name')),
                ('year', models.IntegerField(verbose_name='Year')),
                ('ranking', models.SmallIntegerField(verbose_name='Ranking')),
                ('networth', models.FloatField(verbose_name='Net Worth')),
                ('marketvalue', models.FloatField(verbose_name='Market Value')),
                ('revenue', models.FloatField(verbose_name='Revenue')),
                ('categoryId', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='wwealth.datacategories')),
            ],
        ),
        migrations.CreateModel(
            name='WealthHeld',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=240, verbose_name='Name')),
                ('year', models.IntegerField(verbose_name='Year')),
                ('ranking', models.SmallIntegerField(verbose_name='Ranking')),
                ('networth', models.FloatField(verbose_name='Net Worth')),
                ('marketvalue', models.FloatField(verbose_name='Market Value')),
                ('revenue', models.FloatField(verbose_name='Revenue')),
                ('categoryId', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='wwealth.datacategories')),
            ],
        ),
    ]
