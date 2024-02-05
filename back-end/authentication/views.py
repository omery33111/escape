from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from profile_user.serializers import ProfileSerializer
from profile_user.models import Profile

from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User
from django.conf import settings
from django.core.mail import send_mail
from django.contrib.sites.shortcuts import get_current_site
from django.urls import reverse

import uuid



# ------------------------- HOME PAGE START ------------------------- #
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def index(request):
    return Response("Hello World!")
# ------------------------- HOME PAGE END ------------------------- #



# ------------------------- AUTHENTICATION START ------------------------- #

# ------------- REGISTERATION:
@api_view(["POST"])
def register(request):
    username = request.data["username"]
    password = request.data["password"]
    email = request.data["email"]

    if not (username and password and email):
        return Response({"error": "אנא מלא את כל השדות"}, status=status.HTTP_400_BAD_REQUEST)

    try:
        User.objects.get(username=username)
        return Response({"error": "שם המשתמש כבר קיים."}, status=status.HTTP_400_BAD_REQUEST)
    
    except User.DoesNotExist:
        user = User.objects.create_user(username=username, password=password, email=email, is_active=True)
        user.is_staff = False
        user.save()

        token = str(uuid.uuid4())

        user.profile.activation_token = token
        user.profile.save()

        activation_link = f"{settings.FRONTEND_URL}/activate/{token}/"

        subject = 'Escape Shoes Registration'
        message = f'Welcome to Escape Shoes! Click the link to activate your account: \n{activation_link}'
        from_email = 'omery33111@gmail.com'

        send_mail(subject, message, from_email, [email], fail_silently=False)

        return Response({"success": "נרשמת בהצלחה! בדוק את האימייל שלך לקישור ההפעלה."}, status=status.HTTP_201_CREATED)
    


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def activate_account(request, token):
    user = request.user

    profile = get_object_or_404(Profile, user=user)

    if token != profile.activation_token:
        return Response({"error": "Invalid activation token"}, status=status.HTTP_400_BAD_REQUEST)

    profile.activated = True
    profile.save()

    return Response({"success": "החשבון הופעל בהצלחה!"}, status=status.HTTP_200_OK)



# ------------- LOGIN:
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token["username"] = user.username
        token['is_staff'] = user.is_staff
        return token


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


from rest_framework_simplejwt.tokens import RefreshToken

# ------------- LOGOUT:
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def logout(request):
    refresh_token = request.data.get("refresh_token")

    if not refresh_token:
        return Response({"error": "Refresh token is required."}, status=status.HTTP_400_BAD_REQUEST)

    try:
        token = RefreshToken(refresh_token)
        token.blacklist()
        return Response({"success": "User has been logged out."})
    except Exception as e:
        return Response({"error": "Invalid refresh token."}, status=status.HTTP_400_BAD_REQUEST)
