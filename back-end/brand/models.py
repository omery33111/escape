from django.db import models



class Brand(models.Model):
    name = models.CharField(max_length = 50)
    description = models.TextField(max_length = 700, null = True)
    models = models.JSONField(null = True)

    def __str__(self):
        return self.name
