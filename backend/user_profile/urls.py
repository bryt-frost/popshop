from django.urls import path

from user_profile.views import RetrieveProfileView
from .views import BlacklistTokenView, UserProfileUpdateView
from django.contrib.auth.views import PasswordResetConfirmView


urlpatterns = [
    path("api/token/blacklist/", BlacklistTokenView.as_view(), name="blacklist_token"),
    path(
        "auth/password/reset/confirm/<str:uidb64>/<str:token>/",
        PasswordResetConfirmView.as_view(),
        name="password_reset_confirm",
    ),
    path("profile", RetrieveProfileView.as_view(), name="profile"),
    path("profile/update", UserProfileUpdateView.as_view(), name="update-profile"),
    # path("profile/update", UpdateProfileView.as_view(), name="update-profile"),
]
