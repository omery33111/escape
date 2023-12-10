from django.core.paginator import Paginator, PageNotAnInteger

from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, BasePermission

from brand.serializers import BrandSerializer
from shoe.serializers import ShoeSerializer

from shoe.models import Shoe
from brand.models import Brand



class IsStaff(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.is_staff
    


# ------------------------- BRAND START ------------------------- #
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



@permission_classes([IsStaff])
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