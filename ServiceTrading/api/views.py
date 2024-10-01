from rest_framework import viewsets
from .serializer import UsuarioSerializer, ServicioSerializer
from .models import Usuario, Servicio

class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer
    
class ServicioViewSet(viewsets.ModelViewSet):
    queryset = Servicio.objects.all()
    serializer_class = ServicioSerializer
     
