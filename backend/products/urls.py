from django.urls import path


from products.views import (
    CategoryListAPIView,
    ProductListAPIView,
    ProductDetailAPIView,
    GetSomething,
    RecentProductAPIView,
    ProductCreateAPIView,
    ImageUp,
    ItemListByCategoryView,
)


urlpatterns = [
    path("categories", CategoryListAPIView().as_view(), name="categories"),
    path(
        "categories/<int:id>",
        ItemListByCategoryView.as_view(),
        name="item-list-by-category",
    ),
    path("", ProductListAPIView.as_view(), name=""),
    path("resent-products", RecentProductAPIView.as_view(), name=""),
    path(
        "product/<str:product_id>/",
        ProductDetailAPIView.as_view(),
        name="product-detail",
    ),
    path("try", GetSomething.as_view(), name="try"),
    path("create", ProductCreateAPIView().as_view(), name="create-product"),
    path("image", ImageUp().as_view(), name="image"),
]
