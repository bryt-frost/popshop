from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand



class Command(BaseCommand):
    def handle(self, *args, **options):
        User = get_user_model()
        user_admin = User.objects.filter(email='admin@admin.com')
        if not user_admin:
            user_admin = User.objects.create_superuser(
                email = 'admin@admin.com',
                password = 'admin'
            )
