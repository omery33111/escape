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
        


@api_view(["GET"])
def check_coupon(request, coupon = ""):
    if request.method == "GET":
        try:
            coupon = Coupon.objects.get(name=coupon)
            response_data = {
                "exists": True,
                "discount": coupon.discount,
                "one_time": coupon.one_time,
            }
            return Response(response_data, status=status.HTTP_200_OK)
        except Coupon.DoesNotExist:
            response_data = {
                "exists": False,
                "discount": None,
                "one_time": None,

            }
            return Response(response_data, status=status.HTTP_200_OK)
