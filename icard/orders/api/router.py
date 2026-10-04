from rest_framework.routers import DefaultRouter
from orders.api.api import OrderApiViewSet

router_order = DefaultRouter()
router_order.register(basename='orders', prefix='orders', viewset=OrderApiViewSet)