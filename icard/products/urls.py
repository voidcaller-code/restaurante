from django.urls import path, include

from products.api.router import router_product

urlpatterns = [
    path('', include(router_product.urls)),
]