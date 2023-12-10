from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from django.contrib.auth.models import User

from profile_user.serializers import ProfileSerializer
from profile_user.models import Profile



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
        return Response({"error": "Please provide all fields."})

    try:
        User.objects.get(username = username)
        return Response({"error": "Username already exists."})
    except User.DoesNotExist:
        user = User.objects.create_user(username = username, password = password, email = email)
        user.is_staff = False
        user.save()

        return Response({"success": "User registered successfully."}, status = status.HTTP_201_CREATED)
    


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