from django.db import models
from django.contrib.auth.models import User
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.models import Group, Permission



class ProfileManager(models.Manager):
    def get_or_create_profile(self, user):
        try:
            profile = self.get(user=user)
        except Profile.DoesNotExist:
            profile = self.create(user=user)
        return profile



class Profile(AbstractUser):
    user = models.OneToOneField(User, on_delete = models.SET_NULL, null = True)
    username = models.CharField(max_length = 40, default = "UNKNOWN")
    date = models.DateTimeField(auto_now_add = True)
    objects = ProfileManager()

    groups = models.ManyToManyField(Group, related_name='profile_user_groups')
    user_permissions = models.ManyToManyField(Permission, related_name='profile_user_permissions')


    def __init__(self, *args, **kwargs):
        super(Profile, self).__init__(*args, **kwargs)

    def __str__(self):
        return self.user
