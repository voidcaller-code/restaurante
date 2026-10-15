from rest_framework.routers import DefaultRouter
from payments.api.api import PaymentApiViewSet

router_payment = DefaultRouter()
router_payment.register(basename='payments', prefix='payments', viewset=PaymentApiViewSet)