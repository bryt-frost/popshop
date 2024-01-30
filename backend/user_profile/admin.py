from django.contrib import admin
from .models import *


admin.site.register([User, Address, Country, Region, City,DropPoint])



@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    """Admin View for Profile"""

    list_display = (
        "user",
        "last_seen",
        "online",
    )
