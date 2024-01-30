from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import CartItem, Cart
from .serializers import ProductSerializer, CartItemSerializer, CreateCartItemSerializer
from products.models import Product
from user_profile.models import Profile
from django.db.models import Prefetch
from rest_framework import generics, status
from django.db.models import F


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def cart_items(request):
    profile_prefetch = Prefetch(
        "user", queryset=Profile.objects.prefetch_related("user")
    )

    try:
        user_profile = get_object_or_404(
            Profile.objects.select_related("user__profile").prefetch_related(
                profile_prefetch
            ),
            user=request.user,
        )

        # Retrieve cart items associated with the user profile
        cart_items = CartItem.objects.filter(cart__user=user_profile)
        serializer = CartItemSerializer(
            cart_items, context={"request": request}, many=True
        )

        return Response(serializer.data)

    except Profile.DoesNotExist:
        # Handle the case where the user profile is not found
        return Response(
            {"detail": "User profile not found for the current user."},
            status=status.HTTP_400_BAD_REQUEST,
        )


class CartItemCreateView(generics.CreateAPIView):
    serializer_class = CreateCartItemSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):


        user_profile = Profile.objects.get(user=self.request.user)
        user_cart = Cart.objects.get(user=user_profile)

        serializer = self.get_serializer(data=request.data, many=True)
        serializer.is_valid(raise_exception=True)

        cart_items = []
        for item_data in serializer.validated_data:
            # Use the appropriate field(s) for uniqueness checks in the model
            unique_criteria = {"product": item_data["product"], "cart": user_cart}

            # Update the quantity if the item already exists
            cart_item, created = CartItem.objects.update_or_create(
                **unique_criteria, defaults={"quantity": item_data["quantity"]}
            )

            cart_items.append(cart_item)

        return Response(serializer.data, status=status.HTTP_201_CREATED)


class DestroyCartItemView(generics.DestroyAPIView):
    serializer_class = CreateCartItemSerializer
    permission_classes = [IsAuthenticated]
    queryset = CartItem.objects.all()
