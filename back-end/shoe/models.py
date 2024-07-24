from django.db import models
from brand.models import Brand



class Shoe(models.Model):
    name = models.CharField(max_length = 150)
    description = models.TextField(max_length = 1200)
    price_before = models.DecimalField(max_digits = 6, decimal_places = 2, null = True, blank = True)
    price = models.DecimalField(max_digits = 6, decimal_places = 2)
    sizes = models.JSONField()
    images = models.JSONField()
    model = models.CharField(max_length = 100, null = True, blank = True)
    time = models.DateTimeField(auto_now_add = True)
    brand = models.ForeignKey(Brand, on_delete = models.CASCADE, related_name = "shoes")
    wall = models.BooleanField(default = False)
    out_of = models.BooleanField(default = False)
    chosen = models.BooleanField(default = False)
    blacklisted = models.BooleanField(default = False)

    def __str__(self):
        return self.name


class ShoeImage(models.Model):
    image = models.ImageField(blank = True, null = True)

    def __str__(self):
        return self
