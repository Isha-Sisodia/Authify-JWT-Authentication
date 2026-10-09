
from django.contrib import admin
from django.urls import path, include

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView
)

from accounts.views import register_page, login_page, dashboard_page


urlpatterns = [
    path('admin/', admin.site.urls),
    
    path('login/', login_page, name='login_page'),

    # Registration UI
    path('register/', register_page, name='register_page'),

    # Existing account APIs
    path('api/', include('accounts.urls')),

    # JWT endpoints
    path(
        'api/token/',
        TokenObtainPairView.as_view(),
        name='token_obtain_pair'
    ),
    path(
        'api/token/refresh/',
        TokenRefreshView.as_view(),
        name='token_refresh'
    ),
    path(
        'api/token/verify/',
        TokenVerifyView.as_view(),
        name='token_verify'
    ),
    path('dashboard/', dashboard_page, name='dashboard_page'),
]
