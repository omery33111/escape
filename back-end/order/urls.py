from django.urls import path
from . import views



urlpatterns = [
    path('order_post/', views.order),
    path('user_lastmonth_orders/', views.user_lastmonth_orders),
    path('user_orders_amount/', views.user_orders_amount),
    path('user_orders/<int:page>/', views.user_orders),

    path('delete_order/<int:pk>/', views.delete_order),
]
