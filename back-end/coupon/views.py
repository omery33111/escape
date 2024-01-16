from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .serializers import CouponSerializer
from .models import Coupon



@api_view(["POST"])
def post_coupon(request):
    if request.method == "POST":
        serializer = CouponSerializer(data = request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status = status.HTTP_201_CREATED)
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)


@api_view(["DELETE"])
def delete_coupon(request, pk = -1):
    if request.method == "DELETE":
        try:
            item = Coupon.objects.get(pk = pk)
            item.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Coupon.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        


@api_view(["GET"])
def check_coupon(request, coupon = ""):
    if request.method == "GET":
        try:
            coupon = Coupon.objects.get(name=coupon)
            response_data = {
                "exists": True,
                "discount": coupon.discount
            }
            return Response(response_data, status=status.HTTP_200_OK)
        except Coupon.DoesNotExist:
            response_data = {
                "exists": False,
                "discount": None
            }
            return Response(response_data, status=status.HTTP_200_OK)
