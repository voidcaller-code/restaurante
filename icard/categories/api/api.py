from common.responses import BaseModelViewSet
from categories.models import Category
from rest_framework.permissions import IsAuthenticatedOrReadOnly # Los autenticados pueden realizar peticiones y los no autenticados solo lectura
from categories.api.serializers import CategorySerializer

class CategoryApiViewSet(BaseModelViewSet):
    permission_classes = [IsAuthenticatedOrReadOnly]

    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    