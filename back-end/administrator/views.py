from django.core.paginator import Paginator, PageNotAnInteger
from django.utils import timezone

from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response

from insta_rec.serializers import InstaRecSerializer
from brand.serializers import BrandSerializer
from shoe.serializers import ShoeSerializer
from insta_rec.serializers import InstaRecSerializer
from order.serializers import GetOrderSerializer
from coupon.serializers import CouponSerializer
from profile_user.serializers import GetProfileSerializer

from order.models import Order
from shoe.models import Shoe
from brand.models import Brand
from coupon.models import Coupon
from insta_rec.models import InstaRec
from profile_user.models import Profile
from rest_framework import permissions
from django.http import HttpResponseForbidden



# ------------------------- INSTAREC START ------------------------- #
@api_view(["GET"])
def is_user_staff(request):
    if request.method == "GET":
        if request.user.is_staff:
            return Response(True)
        else:
            return Response(False)
    else:
        return HttpResponseForbidden("Method not allowed")


@api_view(["POST"])
@permission_classes([permissions.IsAdminUser])
def post_insta_rec(request):
    if request.method == "POST":
        serializer = InstaRecSerializer(data=request.data)

        if serializer.is_valid():
            if InstaRec.objects.count() >= 50:
                oldest_instarec = InstaRec.objects.earliest('id')
                oldest_instarec.delete()

            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    
@api_view(["GET"])
@permission_classes([permissions.IsAdminUser])
def instarec_amount(request):
    insta_amount = InstaRec.objects.count()
    return Response({insta_amount}, status=status.HTTP_200_OK)

    
@api_view(["DELETE"])
@permission_classes([permissions.IsAdminUser])
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
@api_view(["GET"])
@permission_classes([permissions.IsAdminUser])
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




@api_view(["POST"])
@permission_classes([permissions.IsAdminUser])
def post_brand(request):
    if request.method == "POST":
        serializer = BrandSerializer(data = request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status = status.HTTP_201_CREATED)
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)





@api_view(["GET"])
@permission_classes([permissions.IsAdminUser])
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




@api_view(["GET"])
@permission_classes([permissions.IsAdminUser])
def brands_amount(request):
    brands_amount = Brand.objects.count()
    return Response({brands_amount}, status=status.HTTP_200_OK)




@api_view(["DELETE"])
@permission_classes([permissions.IsAdminUser])
def delete_brand(request, pk = -1):
    if request.method == "DELETE":
        try:
            brand = Brand.objects.get(pk = pk)
            brand.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Brand.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        



@api_view(["PUT"])
@permission_classes([permissions.IsAdminUser])
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
@api_view(["POST"])
@permission_classes([permissions.IsAdminUser])
def post_shoe(request):
    if request.method == "POST":
        serializer = ShoeSerializer(data = request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status = status.HTTP_201_CREATED)
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)




@api_view(["GET"])
@permission_classes([permissions.IsAdminUser])
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




@api_view(["GET"])
@permission_classes([permissions.IsAdminUser])
def shoes_amount(request):
    shoes_amount = Shoe.objects.count()
    return Response({shoes_amount}, status=status.HTTP_200_OK)




@api_view(["DELETE"])
@permission_classes([permissions.IsAdminUser])
def delete_shoe(request, pk = -1):
    if request.method == "DELETE":
        try:
            shoe = Shoe.objects.get(pk = pk)
            shoe.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Shoe.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        



@api_view(["PUT"])
@permission_classes([permissions.IsAdminUser])
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
@api_view(["GET"])
@permission_classes([permissions.IsAdminUser])
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



@api_view(["GET"])
@permission_classes([permissions.IsAdminUser])
def orders_amount(request):
    orders_amount = Order.objects.count()
    return Response({orders_amount}, status=status.HTTP_200_OK)




@api_view(["GET"])
@permission_classes([permissions.IsAdminUser])
def recent_orders(request):
    twenty_four_hours_ago = timezone.now() - timezone.timedelta(hours=24)

    # Filter orders created in the last 24 hours
    orders = Order.objects.filter(time__gte=twenty_four_hours_ago)

    serializer = GetOrderSerializer(orders, many=True)
    return Response(serializer.data)
# ------------------------- ORDER END ------------------------- #




# ------------------------- COUPON START ------------------------- #
@api_view(["GET"])
@permission_classes([permissions.IsAdminUser])
def get_coupons(request):
    coupons = Coupon.objects.all()
    serializer = CouponSerializer(coupons, many=True)
    return Response(serializer.data)




@api_view(["DELETE"])
@permission_classes([permissions.IsAdminUser])
def delete_coupon(request, pk = -1):
    if request.method == "DELETE":
        try:
            coupon = Coupon.objects.get(pk = pk)
            coupon.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Coupon.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        



@api_view(["POST"])
@permission_classes([permissions.IsAdminUser])
def post_coupon(request):
    if request.method == "POST":
        serializer = CouponSerializer(data = request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status = status.HTTP_201_CREATED)
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
    



@api_view(["PUT"])
@permission_classes([permissions.IsAdminUser])
def update_coupon(request, pk = -1):
    if request.method == "PUT":
        coupon = Coupon.objects.get(pk = pk)
        serializer = CouponSerializer(coupon, data = request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
    



@api_view(["GET"])
@permission_classes([permissions.IsAdminUser])
def single_coupon(request, pk = -1):
    try:
        coupon = Coupon.objects.get(pk = pk)
        serializer = CouponSerializer(coupon)
        return Response(serializer.data, status = status.HTTP_200_OK)
    except Coupon.DoesNotExist:
        return Response(status = status.HTTP_404_NOT_FOUND)
# ------------------------- COUPON END ------------------------- #
    



# ------------------------- USERS START ------------------------- #
@api_view(['GET'])
@permission_classes([permissions.IsAdminUser])
def search_profile(request):
    username = request.query_params.get('username', None)
    if username is None:
        return Response({'error': 'Username parameter is required'}, status=status.HTTP_400_BAD_REQUEST)

    print(f"Searching for username: {username}")
    profiles = Profile.objects.filter(user__username__icontains=username)
    print(f"Found profiles: {profiles}")
    serializer = GetProfileSerializer(profiles, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)





@api_view(["GET"])
@permission_classes([permissions.IsAdminUser])
def all_profiles(request, page):
    profiles_per_page = 8

    all_profiles = Profile.objects.order_by('username')

    paginator = Paginator(all_profiles, profiles_per_page)

    try:
        profiles = paginator.page(page)
    except PageNotAnInteger:
        return Response({"error": "Invalid page number."}, status=400)

    serializer = GetProfileSerializer(profiles, many=True)

    return Response(serializer.data)




@api_view(["GET"])
@permission_classes([permissions.IsAdminUser])
def orders_peruser(request, pk):
    if request.method == "GET":
        try:
            # Retrieve orders for the user with the specified primary key
            user_orders = Order.objects.filter(user__pk=pk).order_by('-time')

            # Serialize the orders
            serializer = GetOrderSerializer(user_orders, many=True)

            # Return the serialized data as a response
            return Response(serializer.data)
        except Order.DoesNotExist:
            return Response({"error": f"User with primary key {pk} not found"}, status=404)
    



@api_view(["GET"])
@permission_classes([permissions.IsAdminUser])
def profiles_amount(request):
    profiles_amount = Profile.objects.count()
    return Response({profiles_amount}, status=status.HTTP_200_OK)
# ------------------------- USERS END ------------------------- #
