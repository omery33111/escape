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

    path('instarec_amount/', views.instarec_amount),

    path('post_insta_rec/', views.post_insta_rec),
    path('get_paged_insta_recs/<int:page>/', views.get_paged_insta_recs),
    path('delete_instarec/<int:pk>/', views.delete_instarec),

    path('get_paged_orders/<int:page>/', views.get_paged_orders),
    path('orders_amount/', views.orders_amount),
    path('recent_orders/', views.recent_orders),

    path('get_coupons/', views.get_coupons),
    path('post_coupon/', views.post_coupon),
    path('delete_coupon/<int:pk>/', views.delete_coupon),
    path('update_coupon/<int:pk>/', views.update_coupon),
    path('single_coupon/<int:pk>/', views.single_coupon),

    path('search_profile/', views.search_profile),
    path('all_profiles/<int:page>/', views.all_profiles),
    path('orders_peruser/<int:pk>/', views.orders_peruser),
    path('profiles_amount/', views.profiles_amount),

    path('is_user_staff/', views.is_user_staff),
]