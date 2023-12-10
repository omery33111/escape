from django.urls import path
from . import views



urlpatterns = [
    path('post_brand/', views.post_brand),
    path('get_paged_brands/<int:page>/', views.get_paged_brands),
    path('brands_amount/', views.brands_amount),
    path('delete_brand/<int:pk>/', views.delete_brand),
    path('update_brand/<int:pk>/', views.update_brand),

    path('post_shoe/', views.post_shoe),
    path('get_paged_shoes/<int:page>/', views.get_paged_shoes),
    path('shoes_amount/', views.shoes_amount),
    path('delete_shoe/<int:pk>/', views.delete_shoe),
    path('update_shoe/<int:pk>/', views.update_shoe),
]