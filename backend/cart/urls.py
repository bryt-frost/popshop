from django.urls import path
from . import views

urlpatterns = [
    path("", views.cart_items),
    path("add-to-cart/", views.CartItemCreateView.as_view(), name="add-to-cart"),
    path("destroy-cart-item/<str:pk>/", views.DestroyCartItemView.as_view(), name="destroy-cart-item"),
]
