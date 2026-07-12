from  rest_framework.routers import DefaultRouter
from users.api.api import UserApiViewSet

router_user = DefaultRouter()
router_user.register(basename='users', prefix='users', viewset=UserApiViewSet)