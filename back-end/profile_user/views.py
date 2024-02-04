from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework import permissions

from .models import Profile
from .serializers import ProfileSerializer



class IsEmailVerified(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.profile.email_verified
    
    
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_profile(request):
    if request.method == "GET":
        user = request.user
        my_profile = Profile.objects.get(user = user)
        serilaizer = ProfileSerializer(my_profile, many = False)
        return Response(serilaizer.data)
