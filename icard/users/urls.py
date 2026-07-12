from django.urls import path, include

from users.api.router import router_user
from users.api.api import UserApiView

urlpatterns = [
    path('', include(router_user.urls)),

    path('auth/me/', UserApiView.as_view(), name='user-me'),
]