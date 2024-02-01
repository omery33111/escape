from django.contrib.auth.models import User
from django.db import models
from django.core.validators import MaxValueValidator, EmailValidator
from django.core.exceptions import ValidationError
import re


def _validate_alphanumeric(value):
    if not re.match(r'^[a-zA-Z0-9א-ת]+$', value):
        raise ValidationError('Only letters, numbers, and Hebrew characters are allowed.')


def _validate_alphanumeric_spaces(value):
    if not re.match(r'^[a-zA-Z0-9א-ת ]+$', value):
        raise ValidationError('Only letters, numbers, Hebrew characters, and spaces are allowed.')
    

def _validate_alphanumeric_and_hyphen(value):
    if not re.match(r'^[a-zA-Z0-9א-ת- ]+$', value):
        raise ValidationError('Only letters, numbers, Hebrew characters, "-", and spaces are allowed are allowed.')


class Shipping(models.Model):
    first_name = models.CharField(max_length=25, validators=[_validate_alphanumeric_spaces])
    last_name = models.CharField(max_length=25, validators=[_validate_alphanumeric_spaces])
    city = models.CharField(max_length=80, validators=[_validate_alphanumeric_and_hyphen])
    address = models.CharField(max_length=80, validators=[_validate_alphanumeric_and_hyphen])
    house_number = models.DecimalField(max_digits=3, decimal_places=0)
    phone_number = models.IntegerField()
    email = models.EmailField(max_length=254, validators=[EmailValidator()], null=True)
    postal_code = models.IntegerField(validators=[MaxValueValidator(9999999)])
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)

    def __str__(self):
        return str(self.address)
