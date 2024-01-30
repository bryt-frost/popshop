from django.urls import path
from .views import CreateOrderView,RetrieveOrders

urlpatterns = [
    path("", RetrieveOrders.as_view(), name=""),
    path("create-order/", CreateOrderView.as_view(), name="create-order"),
]
