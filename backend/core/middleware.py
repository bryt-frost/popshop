from django.utils.deprecation import MiddlewareMixin
import datetime
from django.conf import settings
from django.core.cache import cache
import jwt
from django.contrib.auth import get_user_model


# class ActiveUserMiddleware(MiddlewareMixin):
#     """Using cached memory to track user online status"""

#     def process_request(self, request):
#         try:
#             jwt_token = request.META.get("HTTP_AUTHORIZATION", "").split(" ")[1]
#             if jwt_token:
#                 try:
#                     # Decode the JWT token to access the user information
#                     payload = jwt.decode(
#                         jwt_token, settings.SECRET_KEY, algorithms=["HS256"]
#                     )
#                     user_id = payload["user_id"]
#                     print("============== OUTPUT START =============")
#                     print(user_id)
#                     print("============== OUTPUT END ===============")
#                     # Create a unique key for the user's "last seen" timestamp using the user's ID
#                     last_seen_key = f"seen_{user_id}"

#                     # Get the last seen timestamp from the cache
                    
#                     last_seen = cache.get(last_seen_key)

#                     # If the last seen timestamp is not in the cache, set it to the current time
#                     last_seen = datetime.datetime.now(datetime.timezone.utc)
#                     cache.set(
#                         last_seen_key,
#                         last_seen,
#                         timeout=settings.USER_LAST_SEEN_TIMEOUT,
#                     )
#                 except (jwt.ExpiredSignatureError, jwt.DecodeError):
#                     pass
#         except:
#             pass

#         if request.user.is_authenticated:
#             now = datetime.datetime.now(datetime.timezone.utc)
#             cache.set(
#                 f"seen_{request.user.id}", now, timeout=settings.USER_LAST_SEEN_TIMEOUT
#             )

#         return None


class ActiveUserMiddleware(MiddlewareMixin):
    """Using cached memory to track user online status"""

    def process_request(self, request):
        self.track_user_activity(request)
        return None

    def track_user_activity(self, request):
        try:
            jwt_token = request.META.get("HTTP_AUTHORIZATION", "").split(" ")[1]
            if jwt_token:
                try:
                    # Decode the JWT token to access the user information
                    payload = jwt.decode(
                        jwt_token, settings.SECRET_KEY, algorithms=["HS256"]
                    )
                    user_id = payload["user_id"]

                    # Create a unique key for the user's "last seen" timestamp using the user's ID
                    last_seen_key = f"seen_{user_id}"

                    # Get the last seen timestamp from the cache
                    last_seen = cache.get(last_seen_key)

                    if last_seen is None:
                        # If the last seen timestamp is not in the cache, set it to the current time
                        last_seen = datetime.datetime.now(datetime.timezone.utc)
                        cache.set(
                            last_seen_key,
                            last_seen,
                            timeout=settings.USER_LAST_SEEN_TIMEOUT,
                        )
                except (jwt.ExpiredSignatureError, jwt.DecodeError):
                    pass
        except:
            pass

        if request.user.is_authenticated:
            now = datetime.datetime.now(datetime.timezone.utc)
            cache.set(
                f"seen_{request.user.id}", now, timeout=settings.USER_LAST_SEEN_TIMEOUT
            )