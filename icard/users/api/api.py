from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.views import APIView
from users.models import User
from rest_framework.response import Response
from users.api.serializers import UserSerializer
from common.responses import BaseModelViewSet


class UserApiViewSet(BaseModelViewSet):
    permission_classes = [IsAdminUser] # solo los admin pueden ver los usuarios

    queryset = User.objects.all().order_by('-id')
    serializer_class = UserSerializer

class UserApiView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user

        return Response({
            "retCode": 0,
            "retMsg": "Registro obtenido correctamente",
            "retData": UserSerializer(user).data
        })