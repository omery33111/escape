from django.urls import path
from . import views



urlpatterns = [
    path('post_coupon/', views.post_coupon),
    path('delete_coupon/<int:pk>/', views.delete_coupon),
    path('check_coupon/<str:coupon>/', views.check_coupon),
]