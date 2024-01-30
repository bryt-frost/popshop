
from celery import shared_task
from .models import Product


@shared_task
def increment_view_count_task():
    # try:
        # product = Product.objects.get(pk=product_id)
        # product.views+= 1
        # product.save()
    print('============== OUTPUT START =============')
    print('something')
    print('============== OUTPUT END ===============')
    # except Product.DoesNotExist:
    #     pass
