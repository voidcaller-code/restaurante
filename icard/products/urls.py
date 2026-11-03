from django.urls import path, include

from products.api.router import router_product, router_branch_product

urlpatterns = [
    path('', include(router_product.urls)),
    path('', include(router_branch_product.urls)),
]