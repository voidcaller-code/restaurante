from common.responses import BaseModelViewSet
from payments.models import Payment
from payments.api.serializers import PaymentSerializer
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import OrderingFilter

class PaymentApiViewSet(BaseModelViewSet):
    queryset = Payment.objects.select_related(
        'table',
        'table__branch',
    ).all()
    serializer_class = PaymentSerializer

    filter_backends = [DjangoFilterBackend, OrderingFilter]
    filterset_fields = ['table', 'table__branch', 'statusPayment']

    ordering_fields = '__all__' # Ordenar por todos los campos
