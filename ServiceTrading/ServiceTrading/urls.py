from django.contrib import admin
from django.urls import path, include
from rest_framework.documentation import include_docs_urls
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from api.views import LoginView, RegistroView, UserProfileView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/', include('api.urls')),
    path('docs/', include_docs_urls(title="Api Documentation")),
    path("registro/", RegistroView.as_view(), name="registro"),
    path("logintoken/", LoginView.as_view(), name="login"),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('perfil/', UserProfileView.as_view(), name='perfil'),
    path("api/",include('chat.urls'))
]