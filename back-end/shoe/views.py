from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from shoe.serializers import ShoeSerializer, ShoeImageSerializer
from shoe.models import Shoe



# ------------------------- SHOE START ------------------------- #
@api_view(["GET"])
def get_all_shoes(request):
    shoes = Shoe.objects.all()
    serializer = ShoeSerializer(shoes, many=True)
    return Response(serializer.data)



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

    if not name:  # If the 'name' parameter is empty or contains only whitespace
        return Response([], status=status.HTTP_200_OK)

    shoes = Shoe.objects.filter(name__icontains=name)

    serializer = ShoeSerializer(shoes, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)
# ------------------------- SHOE START ------------------------- #
