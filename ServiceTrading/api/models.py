from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import User


class UsuarioT(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    edad = models.PositiveIntegerField(null=True, blank=True)
    lugar_vivienda = models.CharField(max_length=255, null=True, blank=True)
    is_admin = models.BooleanField(default=False)  # New field for distinguishing admins

    def __str__(self):
        return self.user.username

class UsuarioManager(BaseUserManager):
    """Custom manager to handle user creation."""
    
    def create_user(self, correo, nombre, contraseña=None, tipo_usuario=""):
        if not correo:
            raise ValueError('El correo es obligatorio.')
        usuario = self.model(
            correo=self.normalize_email(correo),
            nombre=nombre,
            tipo_usuario=tipo_usuario
        )
        usuario.set_password(contraseña)  # Hash the password
        usuario.save(using=self._db)
        return usuario

    def create_superuser(self, correo, nombre, contraseña):
        """Creates and saves a superuser with the given email and password."""
        usuario = self.create_user(correo, nombre, contraseña)
        usuario.is_admin = True
        usuario.save(using=self._db)
        return usuario

class Usuario(AbstractBaseUser):
    """Custom User model replacing the default Django user."""
    id_usuario = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=100)
    correo = models.EmailField(unique=True)
    contraseña = models.CharField(max_length=100)  # Handled by set_password()
    tipo_usuario = models.CharField(max_length=20, blank=True)  # 'ofertante' o 'buscador'
    is_active = models.BooleanField(default=True)  # Required for Django auth
    is_admin = models.BooleanField(default=False)

    objects = UsuarioManager()

    USERNAME_FIELD = 'correo'  # Use correo instead of username
    REQUIRED_FIELDS = ['nombre']

    def __str__(self):
        return f"{self.nombre} ({self.correo})"

    def has_perm(self, perm, obj=None):
        """Does the user have a specific permission?"""
        return True

    def has_module_perms(self, app_label):
        """Does the user have permissions to view the app `app_label`?"""
        return True

    @property
    def is_staff(self):
        """Is the user a member of staff?"""
        return self.is_admin

class Servicio(models.Model):
    id_servicio = models.AutoField(primary_key=True)
    descripcion = models.TextField()
    categoria = models.CharField(max_length=50)
    disponibilidad = models.BooleanField(default=True, blank=True)
    localizacion = models.CharField(max_length=100)
    usuario = models.ForeignKey(UsuarioT, on_delete=models.CASCADE)

    def __str__(self):
        return self.descripcion


class Interaccion(models.Model):
    id_interaccion = models.AutoField(primary_key=True)
    usuario = models.ForeignKey(UsuarioT, on_delete=models.CASCADE, related_name='interacciones')
    servicio = models.ForeignKey(Servicio, on_delete=models.CASCADE, related_name='interacciones')
    estado = models.CharField(max_length=20)  # 'pendiente', 'aceptado', 'rechazado'
    

    def __str__(self):
        return f"{self.usuario} -> {self.servicio}"


class Valoracion(models.Model):
    id_valoracion = models.AutoField(primary_key=True)
    usuario_comentario = models.ForeignKey(UsuarioT, on_delete=models.CASCADE, related_name='valoraciones')
    servicio = models.ForeignKey(Servicio, on_delete=models.CASCADE, related_name='valoraciones')
    puntuacion = models.IntegerField()
    comentario = models.TextField()

    def __str__(self):
        return f"{self.usuario} valoró {self.servicio} con {self.puntuacion} estrellas"


    