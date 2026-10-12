from rest_framework.response import Response
from rest_framework import status
from common.pagination import CustomPageNumberPagination
from rest_framework.viewsets import ModelViewSet


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
        queryset = self.filter_queryset(self.get_queryset())

        page = self.paginate_queryset(queryset)

        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

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
        kwargs["partial"] = True

        response = super().update(request, *args, **kwargs)

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