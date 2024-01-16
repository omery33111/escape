from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.contrib.staticfiles.urls import staticfiles_urlpatterns



urlpatterns = [
    path('admin/', admin.site.urls),
    path('administrator/', include('administrator.urls')),
    path('shoe/', include('shoe.urls')),
    path('order/', include('order.urls')),
    path('shipping/', include('shipping.urls')),
    path('brand/', include('brand.urls')),
    path('authentication/', include('authentication.urls')),
    path('profile/', include('profile_user.urls')),
    path('instarec/', include('insta_rec.urls')),
    path('coupon/', include('coupon.urls')),
]



urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

urlpatterns += staticfiles_urlpatterns()
