from django.db import models
from brand.models import Brand



class Shoe(models.Model):
    name = models.CharField(max_length = 100)
    description = models.TextField(max_length = 400)
    price_before = models.DecimalField(max_digits = 6, decimal_places = 2, null = True, blank = True)
    price = models.DecimalField(max_digits = 6, decimal_places = 2)
    sizes = models.JSONField()
    images = models.JSONField()
    model = models.CharField(max_length = 100)
    time = models.DateTimeField(auto_now_add = True)
    brand = models.ForeignKey(Brand, on_delete = models.CASCADE, related_name = "shoes")

    def __str__(self):
        return self.name



class ShoeImage(models.Model):
    image = models.ImageField()

    def __str__(self):
        return self
