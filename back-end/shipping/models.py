from django.contrib.auth.models import User
from django.db import models
from django.core.validators import MaxValueValidator, EmailValidator



class Shipping(models.Model):
    first_name = models.CharField(max_length = 25)
    last_name = models.CharField(max_length = 25)
    city = models.CharField(max_length = 80)
    address = models.CharField(max_length = 80)
    house_number = models.DecimalField(max_digits = 3, decimal_places = 0)
    phone_number = models.IntegerField()
    email = models.EmailField(max_length=254, validators=[EmailValidator()], null = True)
    postal_code = models.IntegerField(validators=[MaxValueValidator(9999999)])
    user = models.ForeignKey(User, on_delete = models.CASCADE, null = True)

    def __str__(self):
        return str(self.address)
