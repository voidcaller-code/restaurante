from rest_framework.routers import DefaultRouter
from products.api.api import ProductApiViewSet, BranchProductViewSet

router_product = DefaultRouter()
router_product.register(basename='products', prefix='products', viewset=ProductApiViewSet)

router_branch_product = DefaultRouter()
router_branch_product.register(basename='branch-products', prefix='branch-products', viewset=BranchProductViewSet)