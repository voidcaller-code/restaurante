from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response


class CustomPageNumberPagination(PageNumberPagination):
    # Cantidad predeterminada de registros por página
    page_size = 10

    # Permite cambiar la cantidad desde la URL:
    page_size_query_param = "page_size"

    # Evita que el cliente solicite cantidades demasiado grandes
    max_page_size = 100

    # Nombre del parámetro para cambiar de página:
    page_query_param = "page"

    def get_paginated_response(self, data):
        return Response({
            "retCode": 0,
            "retMsg": "Registros obtenidos correctamente",

            # Cantidad de registros devueltos en esta página
            "retCount": len(data),

            # Cantidad total de registros
            "retTotal": self.page.paginator.count,

            # URL de los siguientes registros
            "retNext": self.get_next_link(),

            # Información serializada
            "retData": data
        })