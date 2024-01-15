from rest_framework import serializers
from .models import InstaRec



class InstaRecSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = InstaRec
        fields = '__all__'
