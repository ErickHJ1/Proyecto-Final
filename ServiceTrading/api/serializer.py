from rest_framework import serializers
from .models import Usuario, Servicio, Interaccion,Valoracion

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model=Usuario
        fields='__all__'
        
class ServicioSerializer(serializers.ModelSerializer):
    class Meta:
     model=Servicio
     fields='__all__'

class InteraccionSerializer(serializers.ModelSerializer):
    class Meta:
        model=Interaccion
        fields=['usuario','servicio','estado']
        

class ValoracionSerializer(serializers.ModelSerializer):
    usuario = UsuarioSerializer(read_only=True)  # Incluimos la información del usuario

    class Meta:
        model = Valoracion
        fields = ['id_valoracion', 'servicio', 'usuario', 'comentario', 'puntuacion']

    class Meta:
        model=Valoracion
        fields=['usuario','servicio','puntuacion','comentario']