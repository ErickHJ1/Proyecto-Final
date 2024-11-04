from django.db import models

# Create your models here.
class ChatGpt(models.Model):
# a
    fecha_enviado = models.DateField(auto_now_add=True)
    mensaje = models.CharField(max_length=144)
    emisor = models.ForeignKey('api.UsuarioT',on_delete=models.CASCADE,related_name='uwu')
    receptor = models.ForeignKey('api.UsuarioT',on_delete=models.CASCADE,related_name='owo')
    servicio = models.ForeignKey('api.Servicio',on_delete=models.CASCADE)
    def __str__(self):
        return self.emisor.username
    
    