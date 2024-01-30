from djoser import email
from djoser import utils
from djoser.conf import settings
from django.contrib.auth.tokens import default_token_generator
from django.conf import settings


class PasswordResetEmail(email.PasswordResetEmail):
    template_name = "user_profile/password_reset.html"

    def get_context_data(self):
        # PasswordResetEmail can be deleted
        context = super().get_context_data()

        user = context.get("user")
        context["uid"] = utils.encode_uid(user.pk)
        context["token"] = default_token_generator.make_token(user)
        context["site_name"] = settings.SITE_NAME
        # context["url"] = settings.PASSWORD_RESET_CONFIRM_URL.format(**context)
        context["url"] = settings.FRONTEND_DOMAIN.format(**context)
        return context


class ActivationEmail(email.ActivationEmail):
    template_name = "user_profile/activation.html"

    def get_context_data(self):
        # ActivationEmail can be deleted
        context = super().get_context_data()

        user = context.get("user")
        context["uid"] = utils.encode_uid(user.pk)
        context["token"] = default_token_generator.make_token(user)
        context["site_name"] = settings.SITE_NAME
        context["url"] = settings.FRONTEND_DOMAIN.format(**context)
        return context
