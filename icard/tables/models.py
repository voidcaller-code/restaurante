from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator


class Table(models.Model):

    class TipoMesa(models.TextChoices):
        NINOS = 'NI', 'Niños'
        ESTANDAR = 'ES', 'Estándar'
        VIP = 'VIP', 'VIP'

    capacity = models.PositiveIntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(10)]
    )

    tipo = models.CharField(
        max_length=50,
        choices=TipoMesa.choices,
        default=TipoMesa.ESTANDAR
    )

    def __str__(self):
        return self.tipo

    class Meta:
        verbose_name = 'Mesa'
        verbose_name_plural = 'Mesas'
        ordering = ['-id']
        db_table = 'tables'
