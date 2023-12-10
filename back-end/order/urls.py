from django.urls import path
from . import views



urlpatterns = [
    path('order_post/', views.order),
    path('orders_peruser/', views.orders_peruser),
    path('get_orders/', views.get_orders)
]
