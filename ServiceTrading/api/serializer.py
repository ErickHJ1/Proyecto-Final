from rest_framework import serializers
from .models import Usuario, Servicio, Interaccion, Valoracion

class UsuarioSerializer(serializers.ModelSerializer):
    """Serializer for the Usuario model."""
    class Meta:
        model = Usuario
        fields = '__all__'

    def create(self, validated_data):
        # Hash the password if 'contraseña' field exists in the Usuario model.
        user = Usuario(**validated_data)
        if 'contraseña' in validated_data:
            user.set_password(validated_data['contraseña'])
        user.save()
        return user

class ServicioSerializer(serializers.ModelSerializer):
    """Serializer for the Servicio model."""
    class Meta:
        model = Servicio
        fields = '__all__'

class InteraccionSerializer(serializers.ModelSerializer):
    """Serializer for the Interaccion model."""
    class Meta:
        model = Interaccion
        fields = ['usuario', 'servicio', 'estado']

class ValoracionSerializer(serializers.ModelSerializer):
    """Serializer for the Valoracion model."""
    usuario = serializers.PrimaryKeyRelatedField(queryset=Usuario.objects.all())

    class Meta:
        model = Valoracion
        fields = ['id_valoracion', 'servicio', 'usuario', 'comentario', 'puntuacion']

    def validate(self, data):
        """Validate required fields for Valoracion."""
        if not data.get('usuario'):
            raise serializers.ValidationError("El usuario es requerido.")
        if not data.get('servicio'):
            raise serializers.ValidationError("El servicio es requerido.")
        return data
