from common.responses import BaseModelViewSet
from tables.models import Table
from rest_framework.permissions import IsAuthenticatedOrReadOnly 
from tables.api.serializers import TableSerializer
from django_filters.rest_framework import DjangoFilterBackend

class TableApiViewSet(BaseModelViewSet):
    permission_classes = [IsAuthenticatedOrReadOnly]

    queryset = Table.objects.all()
    serializer_class = TableSerializer

    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['id', 'tipo']
