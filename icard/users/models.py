from django.db import models
from django.contrib.auth.models import AbstractUser # importamos el modelo AbstractUser

class User(AbstractUser):
    email = models.EmailField(unique=True, verbose_name='Correo Electronico')


    # Sustituimos el username por el email
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []