from rest_framework.routers import DefaultRouter
from categories.api.api import CategoryApiViewSet

router_category = DefaultRouter()
router_category.register(basename='categories', prefix='categories', viewset=CategoryApiViewSet)