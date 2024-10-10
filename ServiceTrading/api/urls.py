from django.urls import path, include
from rest_framework import routers
from api import views


router=routers.DefaultRouter()
router.register(r'usuario',views.UsuarioViewSet)
router.register(r'Servicios',views.ServicioViewSet)
router.register(r'Interaccion',views.InteraccionViewSet)
router.register(r'Valoracion',views.ValoracionViewSet)

urlpatterns = [
    path('', include(router.urls))
]
