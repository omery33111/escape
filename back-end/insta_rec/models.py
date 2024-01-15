from django.db import models


class InstaRec(models.Model):
    id = models.AutoField(primary_key=True)
    image = models.ImageField()

    def __str__(self):
        return str(self.id)
