from .models import Category, Product
from django_filters.rest_framework import (
    DjangoFilterBackend,
    FilterSet,
    NumberFilter,
    ModelChoiceFilter,
)
from products.serializers import (
    CategoryListSerializer,
    ProductSerializer,
    ProductDetailSerializer,
    ProductImageSerializer,
)
from rest_framework import filters, status, generics, mixins
from rest_framework.response import Response
from .tasks import increment_view_count_task
from django.shortcuts import get_object_or_404
from rest_framework import permissions
from rest_framework.pagination import PageNumberPagination
from django.db.models import ExpressionWrapper, F, Func, Avg
from .models import Review, ProductImage
from django.db.models import Subquery, OuterRef, Prefetch
from rest_framework.views import APIView
from django.http import Http404
from django.db import transaction
from drf_spectacular.utils import extend_schema
from drf_spectacular.views import extend_schema
from drf_spectacular.types import OpenApiTypes
from drf_yasg.utils import swagger_auto_schema


class CategoryFilter(FilterSet):
    class Meta:
        model = Category
        fields = {
            "name": ["exact", "icontains"],
            # Add more fields as needed
        }


class ProductPriceFilter(FilterSet):
    min_price = NumberFilter(field_name="price", lookup_expr="gte")
    max_price = NumberFilter(field_name="price", lookup_expr="lte")

    class Meta:
        model = Product
        fields = ["min_price", "max_price"]


class CategoryListAPIView(generics.ListAPIView):
    # permission_classes = [permissions.IsAuthenticated]
    queryset = Category.objects.all()
    serializer_class = CategoryListSerializer
    filterset_class = CategoryFilter

    filter_backends = (
        DjangoFilterBackend,
        filters.SearchFilter,
        filters.OrderingFilter,
    )
    search_fields = ["name", "parent__name"]
    ordering_fields = ["name"]
    ordering = ["created"]


class ItemListByCategoryView(generics.ListAPIView):
    serializer_class = ProductSerializer

    def get_queryset(self):
        category_id = self.kwargs.get("id")
        return Product.objects.filter(category__id=category_id)


class ProductPagination(PageNumberPagination):
    page_size = 30
    page_size_query_param = "page_size"

    # max_page_size = 100

    def get_paginated_response(self, data):
        return Response(
            {
                "count": self.page.paginator.count,
                "total_pages": self.page.paginator.num_pages,
                "current_page": self.page.number,
                "next": self.get_next_link(),
                "previous": self.get_previous_link(),
                "results": data,
            }
        )


class ProductDetailAPIView(mixins.RetrieveModelMixin, generics.GenericAPIView):
    serializer_class = ProductDetailSerializer
    lookup_field = "product_id"

    def get_queryset(self):
        return Product.objects.filter(is_deleted=False)

    def get_object(self):
        product_id = self.kwargs["product_id"]
        return get_object_or_404(self.get_queryset(), product_id=product_id)

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def retrieve(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            product_id = str(instance.id)

            viewed_products = request.headers.get("viewed-products", "").split(",")

            if product_id not in viewed_products:
                instance.views += 1
                instance.save()

            serializer = self.get_serializer(instance)
            return Response(serializer.data, status=status.HTTP_200_OK)

        except Http404:
            return Response(
                {"detail": "Product not found."}, status=status.HTTP_404_NOT_FOUND
            )


class RecentProductAPIView(generics.ListAPIView):
    queryset = Product.objects.filter(is_deleted=False).order_by("-created")[:10]
    serializer_class = ProductSerializer


# class ProductListAPIView(generics.ListAPIView):
#     queryset = Product.objects.filter(is_deleted=False)
#     serializer_class = ProductSerializer
#     permission_classes = [permissions.AllowAny]
#     pagination_class = ProductPagination
#     filterset_class = ProductPriceFilter
#     filter_backends = (
#         DjangoFilterBackend,
#         filters.SearchFilter,
#         filters.OrderingFilter,
#     )
#     search_fields = [
#         "description",
#         "title",
#         "price",
#     ]
#     ordering_fields = ["views", "created", "average_rating", "price"]

#     def get_queryset(self):
#         queryset = super().get_queryset()

#         # Check if 'average_rating' is included in the ordering fields
#         if "average_rating" in self.request.query_params.get("ordering", ""):
#             # Use a subquery to calculate average rating for each product
#             average_rating_subquery = (
#                 Review.objects.filter(product=OuterRef("pk"))
#                 .values("product")
#                 .annotate(avg_rating=Avg("stars"))
#                 .values("avg_rating")[:1]
#             )
#             queryset = queryset.annotate(
#                 average_rating=Subquery(average_rating_subquery)
#             )

#         return queryset


class ProductListAPIView(generics.ListAPIView):
    """
    API view for listing products.

    This view retrieves a list of products with optional filtering, searching,
    ordering, and pagination. The products are filtered to exclude those marked as deleted.

    Attributes:
        queryset (QuerySet): The base queryset for retrieving products.
        serializer_class (Type[Serializer]): The serializer class for serializing product data.
        permission_classes (List[Type[BasePermission]]): The permission classes applied to the view.
        pagination_class (Type[BasePagination]): The pagination class for paginating the result set.
        filterset_class (Type[FilterSet]): The filterset class for additional filtering.
        filter_backends (Tuple[Type[BaseFilterBackend]]): The filter backends applied to the view.
        search_fields (List[str]): The fields used for searching products.
        ordering_fields (List[str]): The fields used for ordering products.

    Methods:
        get_queryset(): Retrieve the queryset for the view, including optional average rating annotation.

    Example:
        To retrieve a paginated list of products ordered by views, use the following API call:
        GET /products/?ordering=views&page=1

    Note:
        The average rating can be included in the ordering fields by appending 'average_rating'.
        This will calculate and include the average rating for each product in the queryset.

    See Also:
        - `ProductSerializer`: Serializer class for product data.
        - `ProductPagination`: Pagination class for paginating the result set.
        - `ProductPriceFilter`: Filterset class for additional price filtering.
    """

    queryset = Product.objects.filter(is_deleted=False)
    serializer_class = ProductSerializer
    permission_classes = [permissions.AllowAny]
    pagination_class = ProductPagination
    filterset_class = ProductPriceFilter
    filter_backends = (
        DjangoFilterBackend,
        filters.SearchFilter,
        filters.OrderingFilter,
    )
    search_fields = [
        "description",
        "title",
        "price",
    ]
    ordering_fields = ["views", "created", "average_rating", "price"]

    def get_queryset(self):
        """
        Retrieve the queryset for the view, including optional average rating annotation.

        Returns:
            QuerySet: The final queryset for the view.
        """
        queryset = super().get_queryset()

        # Check if 'average_rating' is included in the ordering fields
        if "average_rating" in self.request.query_params.get("ordering", ""):
            # Use a subquery to calculate average rating for each product
            average_rating_subquery = (
                Review.objects.filter(product=OuterRef("pk"))
                .values("product")
                .annotate(avg_rating=Avg("stars"))
                .values("avg_rating")[:1]
            )
            queryset = queryset.annotate(
                average_rating=Subquery(average_rating_subquery)
            )

        return queryset


class GetSomething(generics.GenericAPIView):
    def get(self, request):
        return Response("hello")


# class ProductListAPIView(generics.GenericAPIView):
#     def get(self, request):
#         print(request)
#         return Response("hello")


# class ProductCreateAPIView(APIView):
#     @extend_schema(
#         request=ProductSerializer,  # Include request body schema
#         responses={201: ProductSerializer},  # Include response schema
#     )
#     @transaction.atomic
#     def post(self, request, *args, **kwargs):
#         serializer = ProductSerializer(data=request.data)
#         if serializer.is_valid():
#             product = serializer.save()

#             # Update caption and product of associated ProductImage objects
#             images_data = request.data.get("images", [])

#             # Use serializer to handle ProductImage creation
#             image_serializer = ProductImageSerializer(
#                 data=images_data, many=True, context={"product": product}
#             )

#             if image_serializer.is_valid():
#                 image_serializer.save()
#                 return Response(serializer.data, status=status.HTTP_201_CREATED)

#             # If there are errors in image creation, rollback the transaction
#             transaction.set_rollback(True)
#             return Response(image_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ProductCreateAPIView(APIView):
    @extend_schema(
        request=ProductSerializer,
        responses={201: ProductSerializer},
        description="Create a new product with image uploads",
    )
    def post(self, request, *args, **kwargs):
        # Extract image data from the request
        images_data = request.data.get("images", [])

        # Save images first
        image_serializer = ProductImageSerializer(data=images_data, many=True)
        if image_serializer.is_valid():
            saved_images = image_serializer.save()

            # Create product and associate with saved images
            product_data = request.data.copy()
            product_data["images"] = [image.id for image in saved_images]

            product_serializer = ProductSerializer(data=product_data)
            if product_serializer.is_valid():
                product_serializer.save()
                return Response(product_serializer.data, status=status.HTTP_201_CREATED)

            # If there are errors in creating the product, delete the saved images
            for image in saved_images:
                image.delete()

            return Response(
                product_serializer.errors, status=status.HTTP_400_BAD_REQUEST
            )

        return Response(image_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ImageUp(generics.CreateAPIView):
    serializer_class = ProductImageSerializer
    queryset = ProductImage.objects.all()
