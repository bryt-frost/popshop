from rest_framework import serializers
from products.models import Category, Product, ProductImage, Review
from django.contrib.auth import get_user_model
from user_profile.serializers import ProfileSerializer
from djoser.serializers import UserSerializer

User = get_user_model()


class CategoryListSerializer(serializers.ModelSerializer):
    # parent = serializers.StringRelatedField()
    parent = serializers.StringRelatedField(source="parent.name", read_only=True)

    class Meta:
        model = Category
        fields = ["name", "parent", "icon", "id"]

    def to_representation(self, instance):
        data = super().to_representation(instance)
        if instance.parent:
            data["parent"] = CategoryListSerializer(instance.parent).data
        return data


class ReviewSerializer(serializers.ModelSerializer):
    user = ProfileSerializer()

    class Meta:
        model = Review
        fields = ("id", "user", "text", "user", "stars", "created_at")


class ProductImageSerializer(serializers.ModelSerializer):
    image = serializers.ImageField
    class Meta:
        model = ProductImage
        fields = "__all__"


class ProductSerializer(serializers.ModelSerializer):
    seller = serializers.SlugRelatedField(slug_field="id", queryset=User.objects)
    category = serializers.SerializerMethodField()
    image = ProductImageSerializer(many=True)
    average_rating = serializers.FloatField(read_only=True)
    num_reviews_to_display = ReviewSerializer(many=True, read_only=True)

    def get_category(self, obj):
        return obj.category.name

    def to_representation(self, instance):
        data = super().to_representation(instance)
        num_reviews_to_display = 3
        data["reviews"] = ReviewSerializer(
            instance.reviews.all()[:num_reviews_to_display], many=True
        ).data

        if instance.category:
            data["category"] = CategoryListSerializer(instance.category).data
        return data

    class Meta:
        model = Product
        exclude = ["modified"]


class ProductDetailSerializer(serializers.ModelSerializer):
    seller = serializers.SlugRelatedField(slug_field="id", queryset=User.objects)
    category = serializers.SerializerMethodField()
    image = ProductImageSerializer(many=True)
    average_rating = serializers.FloatField(read_only=True)
    num_reviews_to_display = ReviewSerializer(many=True, read_only=True)

    def get_category(self, obj):
        return obj.category.name

    def to_representation(self, instance):
        data = super().to_representation(instance)
        num_reviews_to_display = 3
        data["reviews"] = ReviewSerializer(
            instance.reviews.all()[:num_reviews_to_display], many=True
        ).data

        if instance.category:
            data["category"] = CategoryListSerializer(instance.category).data
        return data

    class Meta:
        model = Product
        exclude = ["modified"]
