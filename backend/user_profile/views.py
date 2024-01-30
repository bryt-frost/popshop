from django.shortcuts import render
from djoser import views


from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from user_profile.models import Profile

from user_profile.serializers import ProfileSerializer, UserProfileSerializer

from rest_framework_simplejwt.token_blacklist.models import OutstandingToken
from django.shortcuts import get_object_or_404

# from rest_framework_simplejwt.token_blacklist.admin import


class BlacklistTokenView(APIView):
    def post(self, request, *args, **kwargs):
        try:
            token = request.data["token"]
            OutstandingToken.objects.get(token=token).blacklist()
            return Response(
                {"message": "Token successfully blacklisted"}, status=status.HTTP_200_OK
            )
        except OutstandingToken.DoesNotExist:
            return Response(
                {"message": "Token not found"}, status=status.HTTP_404_NOT_FOUND
            )


class RetrieveProfileView(generics.RetrieveAPIView):
    serializer_class = ProfileSerializer
    permission_classes = {permissions.IsAuthenticated}

    def get_object(self):
        # Retrieve the profile of the currently logged-in user
        profile = self.request.user.profile

        return profile


# class UpdateProfileView(generics.UpdateAPIView):
#     serializer_class = ProfileSerializer
#     permission_classes = [permissions.IsAuthenticated]

#     def get_queryset(self):
#         return Profile.objects.filter(user=self.request.user)

#     def get_object(self):
#         return get_object_or_404(Profile, user=self.request.user)

#     def get(self, request, *args, **kwargs):
#         instance = self.get_object()
#         serializer = self.get_serializer(instance)
#         return Response(serializer.data)

#     def update(self, request, *args, **kwargs):
#         partial = kwargs.pop("partial", False)
#         instance = self.get_object()
#         serializer = self.get_serializer(instance, data=request.data, partial=partial)
#         serializer.is_valid(raise_exception=True)
#         self.perform_create_or_update(serializer)


#         return Response(serializer.data)
class UserProfileUpdateView(generics.RetrieveUpdateAPIView):
    serializer_class = UserProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        # Assuming you have a UserProfile associated with the authenticated user
        return self.request.user.profile
