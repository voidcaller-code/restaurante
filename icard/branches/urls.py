from django.urls import path, include

from branches.api.router import router_branch

urlpatterns = [
    path('', include(router_branch.urls)),

]