from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response


from shoe.serializers import ShoeSerializer, ShoeImageSerializer
from shoe.models import Shoe

from random import sample

from django.db.models import CharField, Case, Value, When



# ------------------------- SHOE START ------------------------- #
@api_view(["GET"])
def get_chosen_shoes(request):
    chosen_shoes = Shoe.objects.filter(chosen=True)
    serializer = ShoeSerializer(chosen_shoes, many=True)
    return Response(serializer.data)



@api_view(["GET"])
def get_wall_shoes(request):
    wall_shoes = Shoe.objects.filter(wall=True)
    serializer = ShoeSerializer(wall_shoes, many=True)
    return Response(serializer.data)



@api_view(["GET"])
def get_all_shoes(request):
    shoes = Shoe.objects.all()
    serializer = ShoeSerializer(shoes, many=True)
    return Response(serializer.data)



@api_view(["GET"])
def get_random_shoes(request):
    try:
        all_shoes = list(Shoe.objects.all())
        if len(all_shoes) < 10:
            return Response([], status=status.HTTP_200_OK)

        random_10_shoes = sample(all_shoes, 10)
        serializer = ShoeSerializer(random_10_shoes, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    


@api_view(["GET"])
def single_shoe(request, pk = -1):
    try:
        shoe = Shoe.objects.get(pk = pk)
        serializer = ShoeSerializer(shoe)
        return Response(serializer.data, status = status.HTTP_200_OK)
    except Shoe.DoesNotExist:
        return Response(status = status.HTTP_404_NOT_FOUND)
    


@api_view(["POST"])
def post_shoe_image(request):
    if request.method == "POST":
        serializer = ShoeImageSerializer(data = request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status = status.HTTP_201_CREATED)
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
    


@api_view(["GET"])
def search_shoe(request):
    name = request.GET.get("name", "").strip()

    if not name:
        return Response([], status=status.HTTP_200_OK)

    shoes = Shoe.objects.filter(name__icontains=name).annotate(
        similarity=Case(
            When(name__iexact=name, then=Value(2)),
            When(name__istartswith=name, then=Value(1.5)),
            When(name__icontains=name, then=Value(1)),
            default=Value(0),
            output_field=CharField(),
        )
    ).order_by('-similarity')

    serializer = ShoeSerializer(shoes, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)
# ------------------------- SHOE START ------------------------- #
