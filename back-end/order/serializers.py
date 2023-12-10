from rest_framework import serializers
from .models import Order
from shoe.serializers import ShoeSerializer
from shipping.serializers import ShippingSerializer
from shipping.models import Shipping

 

class GetOrderSerializer(serializers.ModelSerializer):
    shoe = ShoeSerializer()
    shipping_address = ShippingSerializer()
    class Meta:
        model = Order
        fields = '__all__'

    def create(self, validated_data):
        user = self.context['user']
        return Order.objects.create(**validated_data, user = user)
    

class PostOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = '__all__'

    def create(self, validated_data):
        user = self.context.get('user')
        return Order.objects.create(**validated_data, user=user)
    