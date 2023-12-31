from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Profile
from django.contrib.auth.models import User



@receiver(post_save, sender = User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        instance.profile = Profile.objects.create(user = instance)


def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()