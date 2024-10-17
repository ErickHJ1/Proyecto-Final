from django.db import models
from django.forms import ValidationError
from django.contrib.auth.hashers import make_password

# Create your models here.


from django.contrib.auth.hashers import make_password
from django.db import models

class Usuario(models.Model):
    id_usuario = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=100)
    correo = models.EmailField(unique=True)
    contraseña = models.CharField(max_length=100)
    tipo_usuario = models.CharField(max_length=20, blank=True)  # 'ofertante' o 'buscador'

    # Método para crear un usuario con contraseña encriptada
    @classmethod
    def create_user(cls, nombre, correo, contraseña, tipo_usuario=""):
        return cls.objects.create(
            nombre=nombre,
            correo=correo,
            contraseña=make_password(contraseña),  # Hasheando la contraseña
            tipo_usuario=tipo_usuario
        )
    
    # Devuelve el nombre del usuario como representación del objeto
    def __str__(self):
        return f"{self.nombre} ({self.correo})"




class Servicio(models.Model):
    id_servicio = models.AutoField(primary_key=True)
    descripcion = models.TextField()
    categoria = models.CharField(max_length=50)
    disponibilidad = models.BooleanField(default=True, blank=True)
    localizacion = models.CharField(max_length=100)
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE, related_name='servicios', blank=True)

    def __str__(self):
        return self.descripcion


class Interaccion(models.Model):
    id_interaccion = models.AutoField(primary_key=True)
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE, related_name='interacciones')
    servicio = models.ForeignKey(Servicio, on_delete=models.CASCADE, related_name='interacciones')
    estado = models.CharField(max_length=20)  # 'pendiente', 'aceptado', 'rechazado'
    

    def __str__(self):
        return f"{self.usuario} -> {self.servicio}"


class Valoracion(models.Model):
    id_valoracion = models.AutoField(primary_key=True)
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE, related_name='valoraciones')
    servicio = models.ForeignKey(Servicio, on_delete=models.CASCADE, related_name='valoraciones')
    puntuacion = models.IntegerField()
    comentario = models.TextField()

    def __str__(self):
        return f"{self.usuario} valoró {self.servicio} con {self.puntuacion} estrellas"


