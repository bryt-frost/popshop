from django.core.management.base import BaseCommand
from user_profile.models import Region, Country


class Command(BaseCommand):
    help = "Populate the Region model with regions for Ghana"

    def handle(self, *args, **options):
        ghana_country, created = Country.objects.get_or_create(name="Gh")

        region_names = [
            "Ashanti Region",
            "Brong-Ahafo Region",
            "Central Region",
            "Eastern Region",
            "Greater Accra Region",
            "Northern Region",
            "Upper East Region",
            "Upper West Region",
            "Volta Region",
            "Western Region",
            "Western North Region",
            "Savannah Region",
            "Bono East Region",
            "Ahafo Region",
            "Oti Region",
            "North East Region",
        ]

        for region_name in region_names:
            Region.objects.get_or_create(country=ghana_country, name=region_name)

        self.stdout.write(self.style.SUCCESS("Regions successfully populated."))
