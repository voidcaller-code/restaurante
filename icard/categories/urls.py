from django.urls import path, include

from categories.api.router import router_category

urlpatterns = [
    path('', include(router_category.urls)),

]