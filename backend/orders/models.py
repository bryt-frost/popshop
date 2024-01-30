import uuid
from django.db import models
from user_profile.models import Profile, DropPoint
from products.models import Product
from cart.models import Cart, CartItem
import uuid
from .paystack import Paystack


class Order(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(Profile, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    drop_point = models.ForeignKey(
        DropPoint, on_delete=models.SET_NULL, null=True, blank=True
    )
    estimated_arrival = models.DateField(null=True, blank=True)
    paid = models.BooleanField(default=False)
    status = models.CharField(
        max_length=20,
        choices=[
            ("Pending", "Pending"),
            ("Processed", "Processed"),
            ("Shipped", "Shipped"),
            ("Delivered", "Delivered"),
            ("Cancelled", "Cancelled"),
        ],
        default="Pending",
    )
    total_amount = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        null=True,
        blank=True,
        verbose_name="Total Amount",
    )

    def __str__(self):
        return f"{self.user} - {self.status} - Order ID: {self.id}"


class OrderItem(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    order = models.ForeignKey(Order, related_name="items", on_delete=models.CASCADE)
    cart_item = models.ForeignKey(
        CartItem, on_delete=models.SET_NULL, null=True, blank=True
    )
    product = models.ForeignKey(
        Product, on_delete=models.SET_NULL, null=True, blank=True
    )

    quantity = models.PositiveIntegerField()
    subtotal = models.DecimalField(
        max_digits=10, decimal_places=2, verbose_name="Subtotal"
    )

    def __str__(self):
        return f"Order Item ID: {self.id}"


class Payment(models.Model):
    amount = models.DecimalField(decimal_places=2, max_digits=10)
    email = models.EmailField()
    ref = models.CharField(max_length=16, blank=True)
    verified = models.BooleanField(default=False)
    date_created = models.DateTimeField(auto_now=False, auto_now_add=True)

    class Meta:
        ordering = ["-date_created"]
        verbose_name = "Payment"
        verbose_name_plural = "Payments"

    def save(self, *args, **kwargs):
        while not self.ref:
            uuid_value = uuid.uuid4()
            numeric_value = int(uuid_value.hex, 16)
            ref = str(numeric_value)[:16]
            object_with_similar_ref = Payment.objects.filter(ref=ref)
            if not object_with_similar_ref:
                self.ref = ref
        super().save(*args, **kwargs)

    def amount_value(self):
        return self.amount * 100

    def verify_payment(self):
        paystack = Paystack()
        status, result = paystack.verify_payment(ref=self.ref, amount=self.amount)
        if status:
            if result["amount"] / 100 == self.amount:
                self.verified = True
            self.save()
            if self.verified:
                return True
        return False

    def __str__(self):
        return f"{self.email} {self.amount} {self.ref}"
