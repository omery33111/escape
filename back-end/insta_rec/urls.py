from django.urls import path
from . import views



urlpatterns = [
    path('get_car_insta_recs/<int:page>/', views.get_car_insta_recs),

    path('get_instarec_amount/', views.get_instarec_amount),

    path('get_all_instarecs/', views.get_all_instarecs),
]
