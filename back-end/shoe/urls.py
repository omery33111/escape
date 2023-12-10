from django.urls import path
from . import views



urlpatterns = [
    path('get_all_shoes/', views.get_all_shoes),

    path('single_shoe/<int:pk>/', views.single_shoe),

    path('post_shoe_image/', views.post_shoe_image),
    
    path('search_shoe/', views.search_shoe),
]
