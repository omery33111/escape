from django.urls import path
from . import views



urlpatterns = [
    path('get_all_brands/', views.get_all_brands),
    path('brand_shoes/<int:pk>/<int:page>/<int:orderby>/<str:models>/', views.brand_shoes),
    path('brand_shoes_amount/<int:pk>/', views.brand_shoes_amount),
    path('single_brand/<int:pk>/', views.single_brand),
]