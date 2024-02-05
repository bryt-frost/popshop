from rest_framework import serializers
from .models import Profile, Address, DropPoint, User, Region, Country, City
from djoser.serializers import UserSerializer
from django.db.models import Q
from djoser import views
from django.core.validators import EmailValidator
from django.db  import transaction
from django.http import QueryDict
from rest_framework.renderers import BrowsableAPIRenderer

class DropPointSerializer(serializers.ModelSerializer):
    country = serializers.StringRelatedField()
    region = serializers.StringRelatedField()
    city = serializers.StringRelatedField()

    class Meta:
        model = DropPoint
        fields = ["id", "name", "country", "region", "city"]


class CountrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Country
        fields = ["id", "name"]


class RegionSerializer(serializers.ModelSerializer):
    country = CountrySerializer()

    class Meta:
        model = Region
        fields = ["id", "name", "country"]


class CitySerializer(serializers.ModelSerializer):
    region = RegionSerializer()

    class Meta:
        model = City
        fields = ["id", "name", "region"]


class AddressSerializer(serializers.ModelSerializer):
    country = CountrySerializer()
    region = RegionSerializer()
    city = CitySerializer()

    class Meta:
        model = Address
        fields = ["id", "country", "region", "city"]


class MyUserProfileSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(validators=[])
    class Meta:
        model = User
        fields = ["email", "first_name", "last_name"]


class DropPointSerializer(serializers.ModelSerializer):
    country = serializers.StringRelatedField()
    region = serializers.StringRelatedField()
    city = serializers.StringRelatedField()

    class Meta:
        model = DropPoint
        fields = ["id", "name", "country", "region", "city"]


class ProfileSerializer(serializers.ModelSerializer):
    user = MyUserProfileSerializer() 
    country = CountrySerializer(allow_null=True)
    region = serializers.SlugRelatedField(
        slug_field="name", queryset=Region.objects.all(), allow_null=True
    )

    city = serializers.SlugRelatedField(
        slug_field="name", queryset=City.objects.all(), allow_null=True
    )



    suggested_drop_points = serializers.SerializerMethodField()

    class Meta:
        model = Profile
        fields = [
            "user",
            "profile_picture",
            "phone_number",
            "gender",
            "birth_date",
            "about",
            "country",
            "region",
            "city",
            "last_seen",
            "online",
            "suggested_drop_points",
        ]

    def get_suggested_drop_points(self, profile):
        country = profile.country
        region = profile.region
        city = profile.city

        if country and city:
            # First, try to find drop points in the specified city
            drop_points = (
                DropPoint.objects.filter(city=city, country=country)
                .only("id", "name", "city", "region", "country")
                .distinct()
            )

            if not drop_points and region:
                # If no drop points were found in the city, try to find drop points in the specified region
                drop_points = (
                    DropPoint.objects.filter(region=region, country=country)
                    .only("id", "name", "city", "region", "country")
                    .distinct()
                )

            if drop_points:
                # Serialize the drop points
                serializer = DropPointSerializer(drop_points, many=True)
                return serializer.data

        return []




class UserProfileSerializer(serializers.ModelSerializer):
    user = MyUserProfileSerializer()

    class Meta:
        model = Profile
        fields = [
            "user",
            "about",
            "phone_number",
            "city",
            "region",
            "country",
        ]


    def to_internal_value(self, data):
        # Check if the request is coming from the browsable API
        is_browsable_api = 'request' in self.context and isinstance(self.context['request'].accepted_renderer, BrowsableAPIRenderer)

        if not is_browsable_api:
            # Your custom logic here
            mutable_data = self.convert_data_to_objects(data)
            return super().to_internal_value(mutable_data)

        # If request is from browsable API, use default implementation
        return super().to_internal_value(data)
    def convert_data_to_objects(self, data):
        # Convert QueryDict to mutable dictionary
        mutable_data = data.copy()
        
        # Convert country, region, and city names to objects
        country_name = mutable_data.get('country')
        region_name = mutable_data.get('region')
        city_name = mutable_data.get('city')

        country = None
        region = None
        city = None

        if country_name:
            try:
                country = Country.objects.get(name=country_name)
            except Country.DoesNotExist:
                pass

        if region_name:
            try:
                region = Region.objects.get(name=region_name, country=country)
            except Region.DoesNotExist:
                pass

        if city_name:
            try:
                city = City.objects.get(name=city_name, region=region)
            except City.DoesNotExist:
                pass

        mutable_data['country'] = country.pk if country else None
        mutable_data['region'] = region.pk if region else None
        mutable_data['city'] = city.pk if city else None

        return mutable_data
    def update(self, instance, validated_data):
        
        # Update user data if user email is unique
        user_data = validated_data.pop('user', {})
        new_email = user_data.get('email', instance.user.email)

        if new_email != instance.user.email and not User.objects.filter(email=new_email).exists():
            instance.user.email = new_email
            instance.user.save()
        else:
            user_data.pop('email')
            user_serializer = MyUserProfileSerializer(instance.user, data=user_data, partial=True)
            user_serializer.is_valid(raise_exception=True)
            user_serializer.save()

        # Update profile data if profile fields are changed
        instance.about = validated_data.get('about', instance.about)
        instance.phone_number = validated_data.get('phone_number', instance.phone_number)
    
        instance.city_id = validated_data.get('city', instance.city_id)
        instance.region_id = validated_data.get('region', instance.region_id)
        instance.country_id = validated_data.get('country', instance.country_id)

        instance.save()

        return instance

