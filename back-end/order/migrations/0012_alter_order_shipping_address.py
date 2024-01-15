# Generated by Django 3.2.10 on 2024-01-14 13:47

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('shipping', '0002_alter_shipping_postal_code'),
        ('order', '0011_alter_order_shipping_address'),
    ]

    operations = [
        migrations.AlterField(
            model_name='order',
            name='shipping_address',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='shipping.shipping'),
        ),
    ]