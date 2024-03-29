from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status

from .serializers import ShippingSerializer
from .models import Shipping



# ------------------------- SHIPPING START ------------------------- #
@api_view(["GET"])
def get_next_shipping_id(request):
    try:
        last_shipping = Shipping.objects.latest('id')
        last_shipping_id = last_shipping.id + 1
        return Response({last_shipping_id}, status=status.HTTP_200_OK)
    except Shipping.DoesNotExist:
        return Response({"detail": "No shipping records found."}, status=status.HTTP_404_NOT_FOUND)



@api_view(["POST"])
def post_shipping(request):
    if request.method == "POST":
        context = {'user': request.user} if request.user.is_authenticated else {'user': None}
        serializer = ShippingSerializer(data=request.data, context=context)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

@api_view(["GET"])
def addresses_amount(request):
    addresses_amount = Shipping.objects.count()
    return Response({addresses_amount}, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_shipping(request):
    shipping = Shipping.objects.filter(user_id = request.user.id)
    serializer = ShippingSerializer(shipping, many = True, context = {'request': request})
    return Response(serializer.data)



@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def shipping_delete(request, pk = -1):
    if request.method == "DELETE":
        try:
            shipping_address = Shipping.objects.get(pk = pk)
            shipping_address.delete()
            return Response({"detail": f"Shipping address number '{pk}' was successfully deleted."}, status = status.HTTP_204_NO_CONTENT)
        except Shipping.DoesNotExist:
            return Response(status = status.HTTP_404_NOT_FOUND)

        

@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def shipping_update(request, pk = -1):
    if request.method == "PUT":
        user = request.user
        shipping_address = Shipping.objects.get(pk = pk)
        serializer = ShippingSerializer(shipping_address, data = request.data, context = {"user": user})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
# ------------------------- SHIPPING END ------------------------- #
