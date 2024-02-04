from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response


from shoe.serializers import ShoeSerializer, ShoeImageSerializer
from shoe.models import Shoe

from random import sample

from django.db.models import CharField, Case, Value, When, Q



# ------------------------- SHOE START ------------------------- #
@api_view(["GET"])
def get_chosen_shoes(request):
    chosen_shoes = Shoe.objects.filter(chosen=True, blacklisted=False)
    serializer = ShoeSerializer(chosen_shoes, many=True)
    return Response(serializer.data)



@api_view(["GET"])
def get_wall_shoes(request):
    wall_shoes = Shoe.objects.filter(wall=True, blacklisted=False)
    serializer = ShoeSerializer(wall_shoes, many=True)
    return Response(serializer.data)



@api_view(["GET"])
def get_all_shoes(request):
    all_shoes = Shoe.objects.filter(blacklisted=False)
    serializer = ShoeSerializer(all_shoes, many=True)
    return Response(serializer.data)



@api_view(["GET"])
def get_random_shoes(request):
    try:
        all_non_blacklisted_shoes = list(Shoe.objects.filter(blacklisted=False))
        if len(all_non_blacklisted_shoes) < 10:
            return Response([], status=status.HTTP_200_OK)

        random_10_shoes = sample(all_non_blacklisted_shoes, 10)
        serializer = ShoeSerializer(random_10_shoes, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    


@api_view(["GET"])
def single_shoe(request, pk = -1):
    try:
        shoe = Shoe.objects.get(pk=pk, blacklisted=False)
        serializer = ShoeSerializer(shoe)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Shoe.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    


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
    shoe_name = request.GET.get("name", "")

    if not shoe_name:
        return Response([])

    shoes = Shoe.objects.filter(Q(name__icontains=shoe_name), blacklisted=False)

    serializer = ShoeSerializer(shoes, many=True)

    return Response(serializer.data)
# ------------------------- SHOE START ------------------------- #
