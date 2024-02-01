# Generated by Django 5.0.1 on 2024-01-31 12:40

import shipping.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shipping', '0006_shipping_email'),
    ]

    operations = [
        migrations.AlterField(
            model_name='shipping',
            name='address',
            field=models.CharField(max_length=80, validators=[shipping.models._validate_alphanumeric_spaces]),
        ),
        migrations.AlterField(
            model_name='shipping',
            name='city',
            field=models.CharField(max_length=80, validators=[shipping.models._validate_alphanumeric_spaces]),
        ),
        migrations.AlterField(
            model_name='shipping',
            name='first_name',
            field=models.CharField(max_length=25, validators=[shipping.models._validate_alphanumeric]),
        ),
        migrations.AlterField(
            model_name='shipping',
            name='last_name',
            field=models.CharField(max_length=25, validators=[shipping.models._validate_alphanumeric]),
        ),
    ]
