# Generated by Django 4.2.6 on 2024-01-26 00:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0008_alter_product_uuid'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='uuid',
            field=models.CharField(db_index=True, default='d3e13a7fc5', editable=False, max_length=10),
        ),
    ]
