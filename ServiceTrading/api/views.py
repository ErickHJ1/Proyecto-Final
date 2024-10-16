from rest_framework import viewsets, filters
from .serializer import UsuarioSerializer, ServicioSerializer, InteraccionSerializer, ValoracionSerializer
from .models import Usuario, Servicio, Interaccion, Valoracion

class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer
    
class ServicioViewSet(viewsets.ModelViewSet):
    queryset = Servicio.objects.all()
    serializer_class = ServicioSerializer
    
class InteraccionViewSet(viewsets.ModelViewSet):
    queryset = Interaccion.objects.all()
    serializer_class = InteraccionSerializer
    
class ValoracionViewSet(viewsets.ModelViewSet):
    queryset = Valoracion.objects.all()
    serializer_class = ValoracionSerializer

    # Filtro para permitir obtener valoraciones por servicio
    def get_queryset(self):
        servicio_id = self.request.query_params.get('servicio')
        if servicio_id:
            return self.queryset.filter(servicio=servicio_id)
        return self.queryset
     
