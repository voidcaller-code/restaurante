from common.responses import BaseModelViewSet
from products.models import Product, BranchProduct
from rest_framework.permissions import IsAuthenticatedOrReadOnly # Los autenticados pueden realizar peticiones y los no autenticados solo lectura
from products.api.serializers import ProductSerializer, BranchProductSerializer
from django_filters import rest_framework as filters


class BranchProductFilter(filters.FilterSet):
    table = filters.NumberFilter(field_name='branch__tables__id')
    available = filters.BooleanFilter(method='filter_available')

    class Meta:
        model = BranchProduct
        fields = [
            'branch',
            'product',
            'product__category',
            'active',
            'table',
            'available',
        ]

    def filter_available(self, queryset, name, value):
        if value:
            return queryset.filter(
                active=True,
                stock__gt=0,
                product__active=True,
            )

        return queryset.exclude(
            active=True,
            stock__gt=0,
            product__active=True,
        )

class ProductApiViewSet(BaseModelViewSet):
    permission_classes = [IsAuthenticatedOrReadOnly]

    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    filter_backends = [filters.DjangoFilterBackend]
    filterset_fields = ['category', 'active'] # Que propiedades del modelo quiero que se puedan filtrar

class BranchProductViewSet(BaseModelViewSet):
    permission_classes = [IsAuthenticatedOrReadOnly]

    queryset = BranchProduct.objects.select_related(
        'product',
        'product__category',
    ).order_by('product__title')
    serializer_class = BranchProductSerializer

    filter_backends = [filters.DjangoFilterBackend]
    filterset_class = BranchProductFilter
