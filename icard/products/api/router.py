from rest_framework.routers import DefaultRouter
from products.api.api import ProductApiViewSet

router_product = DefaultRouter()
router_product.register(basename='products', prefix='products', viewset=ProductApiViewSet)