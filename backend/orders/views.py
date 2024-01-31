from django.shortcuts import get_object_or_404
from cart.models import Cart, CartItem
from django.db import transaction
from rest_framework import generics, permissions, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Order, OrderItem, Payment
from .serializers import OrderSerializer, PaymentSerializer
from user_profile.models import DropPoint

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
            drop_point = DropPoint.objects.get(id=self.request.data['id'])

            total_amount = sum(
                item.product.price * item.quantity for item in cart_items
            )

            order = Order.objects.create(
                user=user, total_amount=total_amount, paid=True, drop_point=drop_point
            )

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


class InitializePaymentView(generics.CreateAPIView):
    serializer_class = PaymentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class VerifyPaymentAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, ref):
        payment = get_object_or_404(Payment, ref=ref)
        verified = payment.verify_payment()

        if verified:
            return Response(
                {"detail": "Verification Successful"}, status=status.HTTP_200_OK
            )
        else:
            return Response(
                {"detail": "Verification Failed"}, status=status.HTTP_400_BAD_REQUEST
            )
