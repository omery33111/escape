from django.contrib import admin
from django.urls import path
from . import views
from django.contrib.auth import views as auth_views


urlpatterns = [
    path('', views.index),
    path('joined_recently/', views.joined_recently),
    path('delete_inactive_users/', views.delete_inactive_users),
    path('register/', views.register),
    path('logout/', views.logout),
    path('login/', views.MyTokenObtainPairView.as_view(), name = 'token_obtain_pair'),
    path('activate/<str:token>/', views.activate_account, name='activate_account'),
]