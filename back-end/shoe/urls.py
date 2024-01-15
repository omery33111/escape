from django.urls import path
from . import views



urlpatterns = [
    path('get_chosen_shoes/', views.get_chosen_shoes),
    
    path('get_wall_shoes/', views.get_wall_shoes),
    
    path('get_all_shoes/', views.get_all_shoes),

    path('single_shoe/<int:pk>/', views.single_shoe),

    path('post_shoe_image/', views.post_shoe_image),
    
    path('search_shoe/', views.search_shoe),

    path('get_random_shoes/', views.get_random_shoes),
]
