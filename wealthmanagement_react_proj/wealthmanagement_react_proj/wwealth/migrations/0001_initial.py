# Generated by Django 3.1 on 2020-09-26 08:33

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
                ('name', models.CharField(max_length=240)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='WealthHeldTS',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=240)),
                ('year', models.IntegerField(blank=True, default=0, editable=False)),
                ('ranking', models.IntegerField(blank=True, default=0, editable=False)),
                ('networth', models.CharField(max_length=255)),
                ('marketvalue', models.CharField(max_length=255)),
                ('revenue', models.CharField(max_length=255)),
                ('categoryId', models.ForeignKey(db_column='categoryId', on_delete=django.db.models.deletion.CASCADE, to='wwealth.datacategories')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='WealthHeld',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=240)),
                ('year', models.IntegerField(blank=True, default=0, editable=False)),
                ('ranking', models.IntegerField(blank=True, default=0, editable=False)),
                ('networth', models.CharField(max_length=255)),
                ('marketvalue', models.CharField(max_length=255)),
                ('revenue', models.CharField(max_length=255)),
                ('categoryId', models.ForeignKey(db_column='categoryId', on_delete=django.db.models.deletion.CASCADE, to='wwealth.datacategories')),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
