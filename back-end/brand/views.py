from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Brand
from .serializers import BrandSerializer

from shoe.serializers import ShoeSerializer
from shoe.models import Shoe



# ------------------------- BRAND START ------------------------- #
@api_view(["GET"])
def get_all_brands(request):
    if request.method == "GET":
        brands = Brand.objects.all()
        serializer = BrandSerializer(brands, many = True)
        return Response(serializer.data)


@api_view(["GET"])
def brand_shoes(request, pk, page, orderby=1, models='0'):
    shoes_per_page = 32

    try:
        brand = Brand.objects.get(pk=pk)
        
        if 'old_pk' in request.session and request.session['old_pk'] != pk:
            page = 1
            models = '0'
            request.session['old_pk'] = pk
        elif 'old_pk' not in request.session:
            request.session['old_pk'] = pk

        all_shoes = brand.shoes.all()

        if models != '0':
            models_list = models.split(',')
            all_shoes = all_shoes.filter(model__in=models_list)

        all_shoes = all_shoes.filter(blacklisted=False)

        if orderby == 2:
            all_shoes = all_shoes.order_by('price')
        elif orderby == 3:
            all_shoes = all_shoes.order_by('-price')
        elif orderby == 1:
            all_shoes = all_shoes.order_by('time')
        else:
            return Response({"error": "Invalid orderby parameter."}, status=400)

        paginator = Paginator(all_shoes, shoes_per_page)
        
        try:
            shoes = paginator.page(page)
        except PageNotAnInteger:
            shoes = paginator.page(1)
        except EmptyPage:
            shoes = paginator.page(paginator.num_pages)

        serializer = ShoeSerializer(shoes, many=True)
        return Response(serializer.data)
    except Brand.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)



@api_view(["GET"])
def single_brand(request, pk = -1):
    try:
        brand = Brand.objects.get(pk = pk)
        serializer = BrandSerializer(brand)
        return Response(serializer.data, status = status.HTTP_200_OK)
    except Brand.DoesNotExist:
        return Response(status = status.HTTP_404_NOT_FOUND)



@api_view(["GET"])
def brand_shoes_amount(request, pk):
    try:
        brand = Brand.objects.get(pk=pk)
        shoes_count = brand.shoes.count()
        return Response({shoes_count}, status=status.HTTP_200_OK)
    except Brand.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
# ------------------------- END START ------------------------- #
