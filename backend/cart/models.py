from django.db import models
from user_profile.models import Profile
from products.models import Product
from django.dispatch import receiver
from django.db.models.signals import post_save


class Cart(models.Model):
    user = models.OneToOneField(Profile, on_delete=models.CASCADE)
    products = models.ManyToManyField(Product, through="CartItem")

    class Meta:
        verbose_name = "Cart"
        verbose_name_plural = "Carts"

    def __str__(self):
        return f"Cart -- {self.user}"


class CartItem(models.Model):
    """Model definition for CartItem."""

    cart = models.ForeignKey(Cart, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)

    class Meta:
        """Meta definition for CartItem."""

        verbose_name = "CartItem"
        verbose_name_plural = "CartItems"

    def __str__(self):
        return f"{self.cart}: {self.product} -- {self.quantity}"


@receiver(post_save, sender=Profile)
def create_user_profile(sender, instance, created, *args, **kwargs):
    if created:
        Cart.objects.create(user=instance)
