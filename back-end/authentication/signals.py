from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth.models import User

from django.http.request import HttpRequest

from . import views

@receiver(post_save, sender=User)
def activate_profile(sender, instance, created, **kwargs):
    if created and instance.is_superuser:
        instance.profile.activated = True
        instance.profile.save()


@receiver(post_save, sender=User) 
def trigger_deletion_on_user_creation(sender, instance, created, **kwargs):
    if created:
        from threading import Timer
        delay = 60 * 16
        
        Timer(delay, views.delete_inactive_users).start()
