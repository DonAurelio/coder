# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2017-10-20 17:17
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_auto_20171020_1716'),
    ]

    operations = [
        migrations.AlterField(
            model_name='file',
            name='text',
            field=models.TextField(null=True),
        ),
    ]
