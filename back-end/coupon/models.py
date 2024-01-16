from django.db import models



class Coupon(models.Model):
    name = models.TextField(max_length = 60)
    discount = models.IntegerField(null = False, blank = False)


    def __str__(self):
        return self.name
