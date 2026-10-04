from django.db import models

class Order(models.Model):

    class Status(models.TextChoices):
        PENDING = 'pending', 'Pendiente'
        DELIVERED = 'delivered', 'Entregado'

    table = models.ForeignKey('tables.Table', on_delete=models.SET_NULL, null=True, blank=True)
    product = models.ForeignKey('products.Product', on_delete=models.SET_NULL, null=True, blank=True)
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.PENDING)   
    created_at = models.DateTimeField(auto_now_add=True)
    close = models.BooleanField(default=False)

    def __str__(self):
        return f"Orden {self.id} - Mesa {self.table_id}"


    class Meta:
        verbose_name = 'Orden'
        verbose_name_plural = 'Órdenes'
        ordering = ['-id']
        db_table = 'orders'