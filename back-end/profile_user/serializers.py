from rest_framework import serializers
from .models import Profile

from shipping.serializers import ShippingSerializer
 
 
 
class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'
 
 

class GetProfileSerializer(serializers.ModelSerializer):
    shipping_address = ShippingSerializer(many=True, read_only=True, source='user.shipping_set')

    class Meta:
        model = Profile
        fields = '__all__'
