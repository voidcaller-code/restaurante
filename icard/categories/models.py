from django.db import models

class Category(models.Model):
    title = models.CharField(max_length=100, unique=True, blank=False, null=False)
    image = models.ImageField(upload_to='categories/', null=True, blank=True)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = 'Categoria'
        verbose_name_plural = 'Categorias'
        ordering = ['-id']
        db_table = 'categories'
