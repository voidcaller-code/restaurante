from common.responses import BaseModelViewSet
from products.models import Product
from rest_framework.permissions import IsAuthenticatedOrReadOnly # Los autenticados pueden realizar peticiones y los no autenticados solo lectura
from products.api.serializers import ProductSerializer
from django_filters.rest_framework import DjangoFilterBackend

class ProductApiViewSet(BaseModelViewSet):
    permission_classes = [IsAuthenticatedOrReadOnly]

    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['category', 'active'] # Que propiedades del modelo quiero que se puedan filtrar
