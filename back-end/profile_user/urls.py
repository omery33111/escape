from django.urls import path
from . import views



urlpatterns = [
    path('get_profile/', views.get_profile),
]