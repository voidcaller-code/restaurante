from rest_framework.routers import DefaultRouter
from branches.api.api import BranchApiViewSet

router_branch = DefaultRouter()
router_branch.register(basename='branches', prefix='branches', viewset=BranchApiViewSet)