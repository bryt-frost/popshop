from django.urls import path
from .views import (
    CreateOrderView,
    RetrieveOrders,
    InitializePaymentView,
    VerifyPaymentAPIView,
)

urlpatterns = [
    path("", RetrieveOrders.as_view(), name=""),
    path("pay/", InitializePaymentView.as_view(), name="create-payment"),
    path("pay/verify/<str:ref>", VerifyPaymentAPIView.as_view(), name="verify-payment"),
    path("create-order/", CreateOrderView.as_view(), name="create-order"),
]
