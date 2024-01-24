from django.contrib.auth.models import User
from django.db import models

from shoe.models import Shoe
from shipping.models import Shipping
from coupon.models import Coupon



class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.PROTECT, null=True, blank=True)
    price = models.DecimalField(max_digits = 6, decimal_places = 2)
    amount = models.IntegerField(default = 1)
    shoe = models.ForeignKey(Shoe, on_delete = models.SET_NULL, null = True)
    size = models.TextField(max_length = 10, null = True, blank = True)
    shipping_address = models.ForeignKey(Shipping, on_delete=models.SET_NULL, null=True, blank=False)
    note = models.TextField(max_length = 70, null = True, blank = True)
    coupon = models.TextField(max_length = 60, null = True, blank = True)
    time = models.DateTimeField(auto_now_add = True)



    def __str__(self):
        return str(self.shoe)
