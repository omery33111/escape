from rest_framework import serializers
from .models import Shoe, ShoeImage



class ShoeSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Shoe
        fields = '__all__'



class ShoeImageSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = ShoeImage
        fields = '__all__'
