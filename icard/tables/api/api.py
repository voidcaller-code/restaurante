from common.responses import BaseModelViewSet
from tables.models import Table
from rest_framework.permissions import IsAuthenticatedOrReadOnly 
from tables.api.serializers import TableSerializer
class TableApiViewSet(BaseModelViewSet):
    permission_classes = [IsAuthenticatedOrReadOnly]

    queryset = Table.objects.all()
    serializer_class = TableSerializer