from django.urls import path, include

from orders.api.router import router_order

urlpatterns = [
    path('', include(router_order.urls)),
]