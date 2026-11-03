from common.responses import BaseModelViewSet
from branches.models import Branch
from rest_framework.permissions import IsAuthenticatedOrReadOnly 
from branches.api.serializers import BranchSerializer

class BranchApiViewSet(BaseModelViewSet):
    permission_classes = [IsAuthenticatedOrReadOnly]

    queryset = Branch.objects.all()
    serializer_class = BranchSerializer
    