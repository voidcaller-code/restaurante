from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator

class Payment(models.Model):
    class PaymentType(models.TextChoices):
        CARD = 'card', 'Tarjeta'
        CASH = 'cash', 'Efectivo'

    class StatusPayment(models.TextChoices):
        PENDING = 'pending', 'Pendiente'
        PAID = 'paid', 'Pagado'

    table = models.ForeignKey('tables.Table', on_delete=models.SET_NULL, null=True, blank=True)
    totalPayment = models.DecimalField(max_digits=6, decimal_places=0, validators=[MinValueValidator(0), MaxValueValidator(100000)])
    paymentType = models.CharField(max_length=100, choices=PaymentType.choices, default=PaymentType.CASH)
    statusPayment = models.CharField(max_length=100, choices=StatusPayment.choices, default=StatusPayment.PENDING)
    created_at = models.DateTimeField(auto_now_add=True)


    def __str__(self):
        return f"Pago {self.id} - Mesa {self.table}"

    class Meta:
        verbose_name = 'pago'
        verbose_name_plural = 'pagos'
        ordering = ['-id']
        db_table = 'payments'