
from django.urls import path
from .views import RegisterView, ProfileView

urlpatterns = [
    # Registration API
    path('register/', RegisterView.as_view(), name='register'),

    # Protected profile API
    path('profile/', ProfileView.as_view(), name='profile'),
]
