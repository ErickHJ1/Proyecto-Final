from django.db import models
from django.forms import ValidationError

# Create your models here.
from django.db import models

class Usuario(models.Model):
    id_usuario = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=100)
    correo = models.EmailField(unique=True)
    contraseña = models.CharField(max_length=100)
    tipo_usuario = models.CharField(max_length=20)  # 'ofertante' o 'buscador'

    def __str__(self):
        return self.nombre


class Servicio(models.Model):
    id_servicio = models.AutoField(primary_key=True)
    descripcion = models.TextField()
    categoria = models.CharField(max_length=50)
    disponibilidad = models.BooleanField(default=True)
    localizacion = models.CharField(max_length=100)
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE, related_name='servicios')

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


