from django.contrib.auth.models import User
from django.db import models

from shoe.models import Shoe
from shipping.models import Shipping



class Order(models.Model):
    user = models.ForeignKey(User, on_delete = models.PROTECT, null = False)
    price = models.DecimalField(max_digits = 6, decimal_places = 2)
    amount = models.IntegerField(default = 1)
    shoe = models.ForeignKey(Shoe, on_delete = models.SET_NULL, null = True)
    shipping_address = models.ForeignKey(Shipping, on_delete = models.SET_NULL, null = True, blank = True)


    def __str__(self):
        return str(self.shoe)
