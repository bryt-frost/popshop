# Generated by Django 4.2.6 on 2024-01-25 23:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0005_alter_product_uuid'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='uuid',
            field=models.CharField(db_index=True, default='da99ddc296', editable=False, max_length=10),
        ),
    ]
