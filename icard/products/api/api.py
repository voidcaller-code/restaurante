from common.responses import BaseModelViewSet
from products.models import Product, BranchProduct
from rest_framework.permissions import IsAuthenticatedOrReadOnly # Los autenticados pueden realizar peticiones y los no autenticados solo lectura
from products.api.serializers import ProductSerializer, BranchProductSerializer
from django_filters.rest_framework import DjangoFilterBackend

class ProductApiViewSet(BaseModelViewSet):
    permission_classes = [IsAuthenticatedOrReadOnly]

    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['category', 'active'] # Que propiedades del modelo quiero que se puedan filtrar

class BranchProductViewSet(BaseModelViewSet):
    permission_classes = [IsAuthenticatedOrReadOnly]

    queryset = BranchProduct.objects.select_related(
        'product',
        'product__category',
    ).order_by('product__title')
    serializer_class = BranchProductSerializer

    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['branch', 'product', 'product__category', 'active']
