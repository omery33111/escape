# Generated by Django 3.2.10 on 2024-01-11 12:51

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shipping', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='shipping',
            name='postal_code',
            field=models.IntegerField(validators=[django.core.validators.MaxValueValidator(9999999)]),
        ),
    ]