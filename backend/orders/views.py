# your_app/views.py
from rest_framework import status
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Order, OrderItem
from .serializers import OrderSerializer
from cart.models import CartItem, Cart

from django.db import transaction


class RetrieveOrders(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = OrderSerializer

    def get_queryset(self):
        profile = self.request.user.profile
        return Order.objects.filter(user=profile)

class CreateOrderView(generics.CreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = OrderSerializer

    def perform_create(self, serializer):
        user = self.request.user.profile

        with transaction.atomic():
            user_cart = Cart.objects.get(user=user)
            cart_items = CartItem.objects.filter(cart=user_cart)

            if not cart_items.exists():
                return Response(
                    {"error": "Cart is empty"}, status=status.HTTP_400_BAD_REQUEST
                )

            total_amount = sum(
                item.product.price * item.quantity for item in cart_items
            )

            order = Order.objects.create(user=user, total_amount=total_amount)

            for cart_item in cart_items:
                OrderItem.objects.create(
                    order=order,
                    cart_item=cart_item,
                    product=cart_item.product,
                    quantity=cart_item.quantity,
                    subtotal=cart_item.product.price * cart_item.quantity,
                )

            cart_items.delete()
            serializer.instance = order

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)
