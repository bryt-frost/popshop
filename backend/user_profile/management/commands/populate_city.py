import json
from django.core.management.base import BaseCommand
from django.core.exceptions import ObjectDoesNotExist
from django.db import IntegrityError
from user_profile.models import Region, City


class Command(BaseCommand):
    help = "Populate the City model with cities based on JSON data"

    def handle(self, *args, **options):
        # JSON data directly within the script
        data = [
            {"region": "Ashanti Region", "cities": ["Kumasi", "Obuasi", "Sunyani"]},
            {
                "region": "Brong-Ahafo Region",
                "cities": ["Sunyani", "Techiman", "Berekum"],
            },
            {
                "region": "Central Region",
                "cities": ["Cape Coast", "Mankessim", "Winneba"],
            },
            {"region": "Eastern Region", "cities": ["Koforidua", "Nsawam", "Akim Oda"]},
            {"region": "Greater Accra Region", "cities": ["Accra", "Tema", "Dome"]},
            {
                "region": "Northern Region",
                "cities": ["Tamale", "Bolgatanga", "Damongo"],
            },
            {
                "region": "Upper East Region",
                "cities": ["Bolgatanga", "Bawku", "Navrongo"],
            },
            {"region": "Upper West Region", "cities": ["Wa", "Tumu", "Nandom"]},
            {"region": "Volta Region", "cities": ["Ho", "Keta", "Akatsi"]},
            {
                "region": "Western Region",
                "cities": ["Sekondi-Takoradi", "Tarkwa", "Ellembelle"],
            },
            {
                "region": "Western North Region",
                "cities": ["Sefwi Wiawso", "Bibiani", "Enchi"],
            },
            {"region": "Savannah Region", "cities": ["Damongo", "Buipe", "Yapei"]},
            {
                "region": "Bono East Region",
                "cities": ["Techiman", "Kintampo", "Nkoranza"],
            },
            {"region": "Ahafo Region", "cities": ["Goaso", "Sunyani", "Hwidiem"]},
            {"region": "Oti Region", "cities": ["Dambai", "Jasikan", "Kadjebi"]},
            {
                "region": "North East Region",
                "cities": ["Nalerigu", "Walewale", "Yagaba-Kubori"],
            },
        ]

        # Check the length of the data
        data_length = len(data)
        if data_length == 0:
            self.stdout.write(self.style.SUCCESS("No data to process."))
            return

        self.stdout.write(
            self.style.SUCCESS(f"Processing data for {data_length} entries.")
        )

        total_cities_added = 0  # Initialize the count

        for entry in data:
            region_name = entry.get("region")
            cities = entry.get("cities", [])

            try:
                region, created = Region.objects.get_or_create(name=region_name)
            except IntegrityError:
                self.stdout.write(
                    self.style.ERROR(f"Error creating region '{region_name}'")
                )
                continue  # Skip to the next iteration

            for city_name in cities:
                try:
                    City.objects.create(region=region, name=city_name)
                    total_cities_added += 1
                except IntegrityError:
                    self.stdout.write(
                        self.style.ERROR(
                            f"City '{city_name}' already exists for region '{region_name}'."
                        )
                    )

        self.stdout.write(
            self.style.SUCCESS(
                f"{total_cities_added} cities successfully added from JSON."
            )
        )
