import os
from django.db import models
from django.dispatch import receiver
from django.shortcuts import get_object_or_404
from mptt.models import MPTTModel, TreeForeignKey
from core.validators import validate_image_file_extension
from core.models import Extensions, TimeStampModel

from django.contrib.auth import get_user_model
from user_profile.models import Profile
from PIL import Image

from django.db.models import Count, Subquery, OuterRef


def process_profile_image(image_path):
    img = Image.open(image_path)

    target_width = 200
    target_height = 200

    width, height = img.size

    left = 0
    top = 0
    right = min(width, height)
    bottom = min(width, height)

    img = img.crop((left, top, right, bottom))

    img = img.resize((target_width, target_height))

    return img


User = get_user_model()


def category_image_path(instance, filename):
    return "category/icons/{}/{}".format(instance.name, filename)


def product_image_path(instance, filename):
    # return "product/images/{}/{}".format(instance.image, filename)
    directory_path = f"product/images/{instance.product}"
    # Check if the directory exists, and if not, create it
    # if not os.path.exists(directory_path):
    #     os.makedirs(directory_path)

    return os.path.join(directory_path, filename)


class Category(MPTTModel):
    """Model definition for Category."""

    name = models.CharField(max_length=200, db_index=True)
    icon = models.ImageField(
        upload_to=category_image_path,
        blank=True,
        null=True,
        validators=[validate_image_file_extension],
    )
    parent = TreeForeignKey(
        "self",
        related_name="children",
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        db_index=True,
    )
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)

    class Meta:
        """Meta definition for Category."""

        verbose_name = "Category"
        verbose_name_plural = "Categories"

    def __str__(self):
        """Unicode representation of Category."""
        return self.name

    def save(self, *args, **kwargs):
        if self.id:
            existing = get_object_or_404(Category, id=self.id)
            if existing.icon != self.icon:
                existing.icon.delete(save=False)
        self.name = self.name.upper()
        return super(Category, self).save(*args, **kwargs)

    @receiver(models.signals.pre_delete, sender="products.Category")
    def category_delete_file(sender, instance, **kwargs):
        for field in instance._meta.fields:
            if field.name == "icon":
                file = getattr(instance, field.name)
                if file:
                    file.delete(save=False)


class ProductImage(models.Model):
    product = models.ForeignKey(
        "Product",
        on_delete=models.CASCADE,
        related_name="associated_product",
        null=True,
        blank=True,
    )
    image = models.ImageField(upload_to=product_image_path, blank=True)
    caption = models.CharField(max_length=200, null=True, blank=True)

    class Meta:
        indexes = [
            models.Index(fields=["image"]),
        ]

    def save(self, *args, **kwargs):
        super().save()

        if self.image:
            processed_image = process_profile_image(self.image.path)
            processed_image.save(self.image.path)

    @receiver(models.signals.pre_delete, sender="products.ProductImage")
    def product_image_delete_file(sender, instance, **kwargs):
        # for field in instance._meta.fields:
        #     if field.name == "image":
        #         file = getattr(instance, field.name)
        #         if file:
        #             file.delete(save=False)

        for field in instance._meta.fields:
            if field.name == "image":
                file = getattr(instance, field.name)
                if file:
                    file_path = file.path
                    try:
                        if os.path.exists(file_path):
                            file.delete(save=False)

                            directory = os.path.dirname(file_path)

                            if directory:
                                os.rmdir(directory)
                    except Exception as e:
                        # Log the exception
                        print(f"Error while deleting file: {e}")

    def __str__(self):
        return f"{self.caption}"


class Product(Extensions):
    """Model definition for Product."""

    product_id = models.CharField(max_length=20, null=True, blank=True)
    seller = models.ForeignKey(Profile, on_delete=models.CASCADE, db_index=True)
    category = TreeForeignKey(
        Category, related_name="product_category", on_delete=models.CASCADE
    )
    title = models.CharField(max_length=250)
    price = models.DecimalField(decimal_places=2, max_digits=10, null=True, blank=True)
    image = models.ManyToManyField(ProductImage, related_name="images")
    description = models.TextField(null=True, blank=True)
    in_stalk = models.IntegerField(default=1)
    views = models.IntegerField(default=0)
    is_deleted = models.BooleanField(default=False)

    # @property
    def average_rating(self):
        ratings = Review.objects.filter(product=self)
        if ratings.exists():
            return ratings.aggregate(models.Avg("stars"))["stars__avg"]
        return 0

    def __str__(self):
        return str(self.title)

    class Meta:
        """Meta definition for Product."""

        verbose_name = "Product"
        verbose_name_plural = "Products"

    def generate_product_id(self):
        # Extract the first 3 characters of the product name or use a fallback value
        name_part = (
            self.title[:3].replace(" ", "").upper() if len(self.title) >= 3 else "ABC"
        )

        # Combine the name part and the UUID to create the product ID
        product = f"{name_part}-{self.uuid}"
        return product

    def save(self, *args, **kwargs):
        if not self.product_id:
            self.product_id = self.generate_product_id()


        if self.id:
            existing = Product.objects.get(id=self.id)

            previous_images = existing.image.all()
            new_images = self.image.all()
            images_to_delete = previous_images.difference(new_images)
            for image in images_to_delete:
                image.delete()
        super(Product, self).save(*args, **kwargs)




class Rating(models.Model):
    product = models.ForeignKey(
        Product, on_delete=models.CASCADE, related_name="ratings"
    )
    user = models.ForeignKey(Profile, on_delete=models.CASCADE)
    stars = models.IntegerField(choices=[(i, i) for i in range(1, 6)])
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.product)


class Review(models.Model):
    product = models.ForeignKey(
        Product, on_delete=models.CASCADE, related_name="reviews"
    )
    user = models.ForeignKey(Profile, on_delete=models.CASCADE)
    text = models.TextField(null=True, blank=True)
    stars = models.IntegerField(choices=[(i, i) for i in range(1, 6)])
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.product)
