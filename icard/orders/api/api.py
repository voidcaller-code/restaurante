from common.responses import BaseModelViewSet
from orders.models import Order
from orders.api.serializers import OrderSerializer
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import OrderingFilter

class OrderApiViewSet(BaseModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

    filter_backends = [DjangoFilterBackend, OrderingFilter] 
    filterset_fields = ['table', 'status', 'close']

    ordering_fields = '__all__' # Ordenar por todos los campos
