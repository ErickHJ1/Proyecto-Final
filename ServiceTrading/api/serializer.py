from rest_framework import serializers
from .models import Usuario, Servicio

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model=Usuario
        fields='__all__'
        
class ServicioSerializer(serializers.ModelSerializer):
    class Meta:
     model=Servicio
     fields='__all__'