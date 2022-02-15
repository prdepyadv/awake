from rest_framework.authtoken import views
from django.contrib import admin
from django.urls import path, include
from ask_me import views as ak_views

from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/vocab/', include('base.urls')),
    path('api/qna/', include('ask_me.urls')),

    path('logout', ak_views.logoutUser, name='logout'),
    path('login', ak_views.loginUser, name='login'),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
urlpatterns += [
    path('api-token-auth/', views.obtain_auth_token)
]
