from datetime import datetime, timedelta, timezone
from django.conf import settings
from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.dispatch import receiver
from phonenumber_field.modelfields import PhoneNumberField
from django.db.models.signals import post_save
from core.models import TimeStampModel
from django.core.cache import cache
from django_countries.fields import CountryField
from django.core.validators import MaxValueValidator, MinValueValidator, RegexValidator


class CustomUserManager(BaseUserManager):
    """
    Custom user model manager where email is the unique identifiers
    for authentication instead of usernames.
    """

    def create_user(self, email, password, **extra_fields):
        """
        Create and save a User with the given email and password.
        """
        if not email:
            raise ValueError("The Email must be set")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password, **extra_fields):
        """
        Create and save a SuperUser with the given email and password.
        """
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("is_active", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError("Superuser must have is_staff=True.")
        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must have is_superuser=True.")
        return self.create_user(email, password, **extra_fields)


class User(AbstractUser):
    username = None
    email = models.EmailField(unique=True, blank=True, db_index=True)
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    def __str__(self):
        return self.email


def user_directory_path(instance, filename):
    return "users/{0}/{1}".format(instance.user.username, filename)


def national_image_path(instance, filename):
    return f"national/{instance.user.username}/images/{filename}"


class Profile(TimeStampModel):
    GENDER_MALE = "m"
    GENDER_FEMALE = "f"
    OTHER = "o"
    GENDER_CHOICES = (
        (GENDER_MALE, "Male"),
        (GENDER_FEMALE, "Female"),
        (OTHER, "Other"),
    )
    user = models.OneToOneField(User, related_name="profile", on_delete=models.CASCADE)
    profile_picture = models.ImageField(upload_to=user_directory_path, blank=True)
    phone_number = PhoneNumberField(blank=True)
    gender = models.CharField(
        max_length=1, choices=GENDER_CHOICES, blank=True, null=True
    )
    # user_address = models.ForeignKey(
    #     "address", on_delete=models.CASCADE, null=True, blank=True
    # )
    country = models.ForeignKey(
        "Country", on_delete=models.CASCADE, blank=True, null=True
    )
    region = models.ForeignKey(
        "Region", on_delete=models.CASCADE, blank=True, null=True
    )
    city = models.ForeignKey("City", on_delete=models.CASCADE, blank=True, null=True)
    birth_date = models.DateField(blank=True, null=True)
    about = models.TextField(blank=True, null=True)

    def __str__(self):
        return "%s" % self.user.email

    @property
    def last_seen(self):
        return cache.get(f"seen_{self.user.id}")

    @property
    def online(self):
        return bool(
            self.last_seen
            and (datetime.now(timezone.utc) - self.last_seen)
            <= timedelta(minutes=settings.USER_ONLINE_TIMEOUT)
        )


@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, *args, **kwargs):
    if created:
        Profile.objects.create(user=instance)


class Country(TimeStampModel):
    name = CountryField(blank=False, null=False,default="GH")

    def __str__(self):
        return f"{self.name}"


class Region(TimeStampModel):
    country = models.ForeignKey(Country, on_delete=models.CASCADE,)
    name = models.CharField(max_length=100, null=False, blank=False)

    class Meta:
        unique_together = ["name", "country"]
        ordering = ["name"]

    def __str__(self):
        return self.name


class City(TimeStampModel):
    region = models.ForeignKey(Region, on_delete=models.CASCADE)
    name = models.CharField(max_length=100, null=False, blank=False)

    def __str__(self):
        return self.name


class DropPoint(TimeStampModel):
    name = models.CharField(max_length=200)
    city = models.ForeignKey(City, on_delete=models.CASCADE, blank=True, null=True)
    region = models.ForeignKey(Region, on_delete=models.CASCADE, blank=True, null=True)
    country = models.ForeignKey(
        Country, on_delete=models.CASCADE, blank=True, null=True
    )
    lon = models.CharField(max_length=200, blank=True, null=True)
    lat = models.CharField(max_length=200, blank=True, null=True)
    info = models.TextField(null=True, blank=True)

    def __str__(self):
        return self.name


class Address(TimeStampModel):
    user = models.ForeignKey(Profile, related_name="address", on_delete=models.CASCADE)
    country = models.ForeignKey(Country, on_delete=models.CASCADE)
    region = models.ForeignKey(Region, on_delete=models.CASCADE, null=True, blank=True)
    city = models.ForeignKey(City, on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return f"{self.city} {self.user}"
