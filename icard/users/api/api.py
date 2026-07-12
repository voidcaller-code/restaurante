from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.views import APIView
from users.models import User
from rest_framework.response import Response
from users.api.serializers import UserSerializer

from rest_framework import status

from users.api.pagination import CustomPageNumberPagination

class BaseModelViewSet(ModelViewSet):
    pagination_class = CustomPageNumberPagination

    def success_response(
        self,
        data=None,
        msg="",
        status_code=status.HTTP_200_OK,
        headers=None
    ):
        return Response(
            {
                "retCode": 0,
                "retMsg": msg,
                "retData": data
            },
            status=status_code,
            headers=headers
        )

    def list(self, request, *args, **kwargs):
        # Obtiene el queryset y aplica filtros si existen
        queryset = self.filter_queryset(self.get_queryset())

        # Obtiene solamente los registros de la página solicitada
        page = self.paginate_queryset(queryset)

        if page is not None:
            serializer = self.get_serializer(page, many=True)

            # Llama a CustomPageNumberPagination
            return self.get_paginated_response(serializer.data)

        # Respuesta usada si la paginación estuviera desactivada
        serializer = self.get_serializer(queryset, many=True)

        return self.success_response(
            serializer.data,
            msg="Registros obtenidos correctamente"
        )

    def retrieve(self, request, *args, **kwargs):
        response = super().retrieve(request, *args, **kwargs)

        return self.success_response(
            response.data,
            msg="Registro obtenido correctamente",
            status_code=response.status_code,
            headers=response.headers
        )

    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)

        return self.success_response(
            response.data,
            msg="Registro creado correctamente",
            status_code=response.status_code,
            headers=response.headers
        )

    def update(self, request, *args, **kwargs):
        response = super().update(request, *args, **kwargs)

        return self.success_response(
            response.data,
            msg="Registro actualizado correctamente",
            status_code=response.status_code,
            headers=response.headers
        )

    def partial_update(self, request, *args, **kwargs):
        response = super().partial_update(request, *args, **kwargs)

        return self.success_response(
            response.data,
            msg="Registro actualizado parcialmente",
            status_code=response.status_code,
            headers=response.headers
        )

    def destroy(self, request, *args, **kwargs):
        super().destroy(request, *args, **kwargs)

        return self.success_response(
            None,
            msg="Registro eliminado correctamente",
            status_code=status.HTTP_200_OK
        )


class UserApiViewSet(BaseModelViewSet):
    #permission_classes = [IsAdminUser] # solo los admin pueden ver los usuarios

    queryset = User.objects.all().order_by('id')
    serializer_class = UserSerializer

class UserApiView(APIView):
    #permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user

        return Response({
            "retCode": 0,
            "retMsg": "Registro obtenido correctamente",
            "retData": UserSerializer(user).data
        })