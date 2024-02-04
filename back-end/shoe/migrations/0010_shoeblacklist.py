# Generated by Django 5.0.1 on 2024-02-04 12:49

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shoe', '0009_alter_shoe_description'),
    ]

    operations = [
        migrations.CreateModel(
            name='ShoeBlacklist',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('deleted_at', models.DateTimeField(auto_now_add=True)),
                ('shoe', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='shoe.shoe')),
            ],
        ),
    ]
