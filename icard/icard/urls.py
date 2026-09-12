from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),

    # Documentation
    path('api/v1/', include('document.urls')),

    # Users
    path('api/v1/', include('users.urls')),
]
