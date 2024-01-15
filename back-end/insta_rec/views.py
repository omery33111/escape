from django.core.paginator import Paginator, PageNotAnInteger

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from .models import InstaRec
from .serializers import InstaRecSerializer


@api_view(["GET"])
def get_instarec_amount(request):
    insta_amount = InstaRec.objects.count()
    return Response({insta_amount}, status=status.HTTP_200_OK)


@api_view(["GET"])
def get_all_instarecs(request):
    instarecs = InstaRec.objects.all()
    serializer = InstaRecSerializer(instarecs, many=True)
    return Response(serializer.data)


@api_view(["GET"])
def get_car_insta_recs(request, page):
    items_per_page = 5

    recs = InstaRec.objects.order_by('id')

    paginator = Paginator(recs, items_per_page)

    try:
        recs = paginator.page(page)
    except PageNotAnInteger:
        return Response({"error": "Invalid page number."}, status=400)

    serializer = InstaRecSerializer(recs, many=True)

    return Response(serializer.data)
