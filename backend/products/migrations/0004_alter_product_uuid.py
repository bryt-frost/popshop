# Generated by Django 4.2.6 on 2024-01-21 20:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0003_alter_product_uuid'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='uuid',
            field=models.CharField(db_index=True, default='f65d13d5e8', editable=False, max_length=10),
        ),
    ]