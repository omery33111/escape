from django.urls import path
from . import views
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from django.conf import settings
from django.conf.urls.static import static



urlpatterns = [
    path('post_shipping/', views.post_shipping),
    path('get_shipping/', views.get_shipping),
    path('shipping_update/', views.shipping_update),
    path('shipping_update/<int:pk>/', views.shipping_update),
    path('shipping_delete/<int:pk>/', views.shipping_delete),
    path('addresses_amount/', views.addresses_amount)
]



urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

urlpatterns += staticfiles_urlpatterns()
