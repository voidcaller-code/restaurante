from django.urls import path, include

from payments.api.router import router_payment

urlpatterns = [
    path('', include(router_payment.urls)),
]