from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    is_regular    = models.BooleanField(default=False)
    is_charity    = models.BooleanField(default=False)
    is_restaurant = models.BooleanField(default=False)

class Regular(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE,primary_key=True)
    email= models.OneToOneField(max_length=30)
    