from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator

class Product(models.Model):
    title = models.CharField(max_length=100, unique=True, blank=False, null=False)
    image = models.ImageField(upload_to='products/', null=True, blank=True)
    price = models.DecimalField(max_digits=6, decimal_places=0, validators=[MinValueValidator(0), MaxValueValidator(100000)])
    active = models.BooleanField(default=False)
    category = models.ForeignKey('categories.Category', on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = 'Producto'
        verbose_name_plural = 'Productos'
        ordering = ['-id']
        db_table = 'products'