from django_seed import Seed
from django.contrib.auth import get_user_model
import random
import string
from .models import User
seed = Seed.seeder()

# Seed data for creating 10 user records
for _ in range(10):
    email = seed.faker.email()
    password = ''.join(random.choice(string.ascii_letters + string.digits) for _ in range(12))

    seed.add_entity(User, 1, {
        'email': email,
        'password': User.objects.make_random_password(),
    })

# Execute the seeding process
inserted_pks = seed.execute()
