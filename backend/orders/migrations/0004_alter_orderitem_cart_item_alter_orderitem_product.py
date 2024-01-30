# Generated by Django 4.2.6 on 2024-01-25 23:38

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0007_alter_product_uuid'),
        ('cart', '0003_initial'),
        ('orders', '0003_orderitem_product_alter_order_status_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='orderitem',
            name='cart_item',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='cart.cartitem'),
        ),
        migrations.AlterField(
            model_name='orderitem',
            name='product',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='products.product'),
        ),
    ]