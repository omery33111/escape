# Generated by Django 3.2.10 on 2024-01-14 13:46

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('shipping', '0002_alter_shipping_postal_code'),
        ('order', '0010_order_time'),
    ]

    operations = [
        migrations.AlterField(
            model_name='order',
            name='shipping_address',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT, to='shipping.shipping'),
        ),
    ]
