# Generated by Django 3.2.10 on 2024-01-25 17:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('coupon', '0002_alter_coupon_name'),
    ]

    operations = [
        migrations.AddField(
            model_name='coupon',
            name='one_time',
            field=models.BooleanField(default=True),
        ),
    ]
