from django.urls import path, include

from users.api.router import router_user
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from users.api.api import UserApiView

urlpatterns = [
    path('', include(router_user.urls)),

    path('auth/me/', UserApiView.as_view(), name='user-me'),

    # Auth JWT
    path('auth/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/login/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

]