# Generated by Django 3.2.10 on 2023-12-27 12:05

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0001_initial'),
    ]

    operations = [
        migrations.DeleteModel(
            name='TokenBlacklist',
        ),
    ]
