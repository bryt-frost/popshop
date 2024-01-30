from django.utils import timezone
from django.conf import settings
from django.core.cache import cache


class UserOnlineMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)

        # Update user's last seen timestamp in the cache

        if request.user.is_authenticated:
            cache_key = f"seen_{request.user.id}"
            cache.set(cache_key, timezone.now(), settings.USER_ONLINE_TIMEOUT * 60)

        return response
