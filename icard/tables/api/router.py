from rest_framework.routers import DefaultRouter
from tables.api.api import TableApiViewSet

router_table = DefaultRouter()
router_table.register(basename='tables', prefix='tables', viewset=TableApiViewSet)