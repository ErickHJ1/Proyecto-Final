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
    # Usamos PrimaryKeyRelatedField para aceptar el ID del usuario
    usuario = serializers.PrimaryKeyRelatedField(queryset=Usuario.objects.all())

    class Meta:
        model = Valoracion
        fields = ['id_valoracion', 'servicio', 'usuario', 'comentario', 'puntuacion']

    def validate(self, data):
        if not data.get('usuario'):
            raise serializers.ValidationError("El usuario es requerido.")
        if not data.get('servicio'):
            raise serializers.ValidationError("El servicio es requerido.")
        return data