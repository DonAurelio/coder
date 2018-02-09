# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2018-01-08 21:48
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Resource',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(help_text='Name of this resouce', max_length=100)),
                ('description', models.CharField(help_text='purpose of this resource', max_length=400)),
            ],
        ),
        migrations.CreateModel(
            name='Service',
            fields=[
                ('name', models.CharField(help_text='Service name has to be unique', max_length=100, primary_key=True, serialize=False)),
                ('base_url', models.CharField(help_text='API base url without ending slash', max_length=400)),
                ('description', models.CharField(help_text='Describe the service in few words', max_length=400)),
            ],
        ),
        migrations.AddField(
            model_name='resource',
            name='service',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='providers.Service'),
        ),
        migrations.AlterUniqueTogether(
            name='resource',
            unique_together=set([('service', 'name')]),
        ),
    ]