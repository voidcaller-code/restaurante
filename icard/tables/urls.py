from django.urls import path, include

from tables.api.router import router_table

urlpatterns = [
    path('', include(router_table.urls)),
]