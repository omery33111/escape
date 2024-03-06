# Generated by Django 5.0.1 on 2024-02-19 15:24

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('shipping', '0001_initial'),
        ('shoe', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Order',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('price', models.DecimalField(decimal_places=2, max_digits=6)),
                ('amount', models.IntegerField(default=1)),
                ('size', models.TextField(blank=True, max_length=10, null=True)),
                ('note', models.TextField(blank=True, max_length=70, null=True)),
                ('coupon', models.TextField(blank=True, max_length=60, null=True)),
                ('time', models.DateTimeField(auto_now_add=True)),
                ('shipping_address', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='shipping.shipping')),
                ('shoe', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='shoe.shoe')),
                ('user', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]