# Generated by Django 3.2.10 on 2024-01-03 11:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shoe', '0002_alter_shoe_description'),
    ]

    operations = [
        migrations.AddField(
            model_name='shoe',
            name='wall',
            field=models.BooleanField(default=False),
        ),
    ]