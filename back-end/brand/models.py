from django.db import models



class Brand(models.Model):
    name = models.CharField(max_length = 50)
    description = models.TextField(max_length = 700)
    models = models.JSONField()

    def __str__(self):
        return self.name
