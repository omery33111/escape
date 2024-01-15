from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import BasePermission

from .serializers import GetOrderSerializer, PostOrderSerializer

from .models import Order

from datetime import datetime, timedelta



class IsStaff(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.is_staff


from django.contrib.auth.models import AnonymousUser

@api_view(['POST'])
def order(request):
    if request.method == 'POST':
        user = request.user if request.user and not isinstance(request.user, AnonymousUser) else None

        for item in request.data["orderDetails"]:
            item["shipping_address"] = request.data["orderData"]["shipping_address"]
            serializer = PostOrderSerializer(data=item, context={'user': user})

            if serializer.is_valid():
                serializer.save()

        return Response(serializer.data, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_lastmonth_orders(request):
    last_month_start = datetime.now() - timedelta(days=30)

    orders = Order.objects.filter(
        user_id=request.user.id,
        time__gte=last_month_start
    )

    serializer = GetOrderSerializer(orders, many=True, context={'request': request})
    return Response(serializer.data)



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_orders(request):
    orders = Order.objects.filter(user_id = request.user.id)
    serializer = GetOrderSerializer(orders, many = True, context = {'request': request})
    return Response(serializer.data)

@api_view(["DELETE"])
def delete_order(request, pk = -1):
    if request.method == "DELETE":
        try:
            instarec = Order.objects.get(pk = pk)
            instarec.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Order.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        



