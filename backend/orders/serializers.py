# your_app/serializers.py
from rest_framework import serializers
from .models import Order, OrderItem
from products.serializers import ProductSerializer

class OrderItemSerializer(serializers.ModelSerializer):
    product  = ProductSerializer()
    class Meta:
        model = OrderItem
        fields = ["id", "cart_item", "quantity", "subtotal","product"]


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = ["id", "created_at","estimated_arrival","drop_point",  "status", "total_amount","paid", "items"]
