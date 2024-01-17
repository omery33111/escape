from django.core.paginator import Paginator, PageNotAnInteger
from django.utils import timezone

from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, BasePermission

from insta_rec.serializers import InstaRecSerializer
from brand.serializers import BrandSerializer
from shoe.serializers import ShoeSerializer
from insta_rec.serializers import InstaRecSerializer
from order.serializers import GetOrderSerializer
from coupon.serializers import CouponSerializer

from order.models import Order
from shoe.models import Shoe
from brand.models import Brand
from coupon.models import Coupon
from insta_rec.models import InstaRec



class IsStaff(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.is_staff
    


# ------------------------- INSTAREC START ------------------------- #
@permission_classes([IsStaff])
@api_view(["POST"])
def post_insta_rec(request):
    if request.method == "POST":
        serializer = InstaRecSerializer(data = request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status = status.HTTP_201_CREATED)
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
    
@permission_classes([IsStaff])
@api_view(["GET"])
def instarec_amount(request):
    insta_amount = InstaRec.objects.count()
    return Response({insta_amount}, status=status.HTTP_200_OK)
    
@permission_classes([IsStaff])
@api_view(["DELETE"])
def delete_instarec(request, pk = -1):
    if request.method == "DELETE":
        try:
            instarec = InstaRec.objects.get(pk = pk)
            instarec.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except InstaRec.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
# ------------------------- INSTAREC END ------------------------- #        

# ------------------------- BRAND START ------------------------- #
@permission_classes([IsStaff])
@api_view(["GET"])
def get_paged_insta_recs(request, page):
    items_per_page = 12

    recs = InstaRec.objects.order_by('id')

    paginator = Paginator(recs, items_per_page)

    try:
        recs = paginator.page(page)
    except PageNotAnInteger:
        return Response({"error": "Invalid page number."}, status=400)

    serializer = InstaRecSerializer(recs, many=True)

    return Response(serializer.data)



@permission_classes([IsStaff])
@api_view(["POST"])
def post_brand(request):
    if request.method == "POST":
        serializer = BrandSerializer(data = request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status = status.HTTP_201_CREATED)
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)




@permission_classes([IsStaff])
@api_view(["GET"])
def get_paged_brands(request, page):
    brands_per_page = 10

    all_brands = Brand.objects.order_by('name')

    paginator = Paginator(all_brands, brands_per_page)

    try:
        brands = paginator.page(page)
    except PageNotAnInteger:
        return Response({"error": "Invalid page number."}, status=400)

    serializer = BrandSerializer(brands, many=True)

    return Response(serializer.data)



@permission_classes([IsStaff])
@api_view(["GET"])
def brands_amount(request):
    brands_amount = Shoe.objects.count()
    return Response({brands_amount}, status=status.HTTP_200_OK)



@permission_classes([IsStaff, IsAuthenticated])
@api_view(["DELETE"])
def delete_brand(request, pk = -1):
    if request.method == "DELETE":
        try:
            brand = Brand.objects.get(pk = pk)
            brand.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Brand.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        


@permission_classes([IsStaff])
@api_view(["PUT"])
def update_brand(request, pk = -1):
    if request.method == "PUT":
        brand = Brand.objects.get(pk = pk)
        serializer = BrandSerializer(brand, data = request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
# ------------------------- BRAND END ------------------------- #

# ------------------------- SHOE START ------------------------- #
@permission_classes([IsStaff])
@api_view(["POST"])
def post_shoe(request):
    if request.method == "POST":
        serializer = ShoeSerializer(data = request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status = status.HTTP_201_CREATED)
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)



@permission_classes([IsStaff])
@api_view(["GET"])
def get_paged_shoes(request, page):
    shoes_per_page = 10

    all_shoes = Shoe.objects.order_by('time')

    paginator = Paginator(all_shoes, shoes_per_page)

    try:
        shoes = paginator.page(page)
    except PageNotAnInteger:
        return Response({"error": "Invalid page number."}, status=400)

    serializer = ShoeSerializer(shoes, many=True)

    return Response(serializer.data)



@permission_classes([IsStaff])
@api_view(["GET"])
def shoes_amount(request):
    shoes_amount = Shoe.objects.count()
    return Response({shoes_amount}, status=status.HTTP_200_OK)



@permission_classes([IsStaff])
@api_view(["DELETE"])
def delete_shoe(request, pk = -1):
    if request.method == "DELETE":
        try:
            shoe = Shoe.objects.get(pk = pk)
            shoe.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Shoe.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        


@permission_classes([IsStaff])
@api_view(["PUT"])
def update_shoe(request, pk = -1):
    if request.method == "PUT":
        shoe = Shoe.objects.get(pk = pk)
        serializer = ShoeSerializer(shoe, data = request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
# ------------------------- SHOE END ------------------------- #

# ------------------------- ORDER START ------------------------- #
@permission_classes([IsStaff])
@api_view(["GET"])
def get_paged_orders(request, page):
    items_per_page = 10

    items = Order.objects.order_by('-time')

    paginator = Paginator(items, items_per_page)

    try:
        items = paginator.page(page)
    except PageNotAnInteger:
        return Response({"error": "Invalid page number."}, status=400)

    serializer = GetOrderSerializer(items, many=True)

    return Response(serializer.data)


@permission_classes([IsStaff])
@api_view(["GET"])
def orders_amount(request):
    orders_amount = Order.objects.count()
    return Response({orders_amount}, status=status.HTTP_200_OK)



@permission_classes([IsStaff])
@api_view(["GET"])
def recent_orders(request):
    twenty_four_hours_ago = timezone.now() - timezone.timedelta(hours=24)

    # Filter orders created in the last 24 hours
    orders = Order.objects.filter(time__gte=twenty_four_hours_ago)

    serializer = GetOrderSerializer(orders, many=True)
    return Response(serializer.data)
# ------------------------- ORDER END ------------------------- #



# ------------------------- COUPON START ------------------------- #
@permission_classes([IsStaff])
@api_view(["GET"])
def get_coupons(request):
    coupons = Coupon.objects.all()
    serializer = CouponSerializer(coupons, many=True)
    return Response(serializer.data)



@permission_classes([IsStaff])
@api_view(["DELETE"])
def delete_coupon(request, pk = -1):
    if request.method == "DELETE":
        try:
            coupon = Coupon.objects.get(pk = pk)
            coupon.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Coupon.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        


@permission_classes([IsStaff])
@api_view(["POST"])
def post_coupon(request):
    if request.method == "POST":
        serializer = CouponSerializer(data = request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status = status.HTTP_201_CREATED)
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
    


@permission_classes([IsStaff])
@api_view(["PUT"])
def update_coupon(request, pk = -1):
    if request.method == "PUT":
        coupon = Coupon.objects.get(pk = pk)
        serializer = CouponSerializer(coupon, data = request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
    


@permission_classes([IsStaff])
@api_view(["GET"])
def single_coupon(request, pk = -1):
    try:
        coupon = Coupon.objects.get(pk = pk)
        serializer = CouponSerializer(coupon)
        return Response(serializer.data, status = status.HTTP_200_OK)
    except Coupon.DoesNotExist:
        return Response(status = status.HTTP_404_NOT_FOUND)
# ------------------------- COUPON END ------------------------- #