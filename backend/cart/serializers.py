from rest_framework import serializers
from .models import Product, CartItem
from products.serializers import ProductSerializer, ProductImageSerializer


class CartProductSerializer(serializers.ModelSerializer):
    image = ProductImageSerializer(many=True)

    class Meta:
        model = Product
        fields = ["title", "price", "id", "image", "product_id"]


class CartItemSerializer(serializers.HyperlinkedModelSerializer):
    product = CartProductSerializer()

    class Meta:
        model = CartItem
        fields = ["product", "quantity", "id"]

    # def get_image(self, obj):
    #     # Retrieve the full image URLs from the product serializer
    #     product_data = ProductSerializer(obj.product).data
    #     base_url = self.context["request"].build_absolute_uri("/")[:-1]

    #     image = product_data.get("image", [])
    #     for image_data in image:
    #         image_data["image"] = f"{base_url}{image_data['image']}"

    #     return image


class CreateCartItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = CartItem
        fields = [ "product", "quantity"]
