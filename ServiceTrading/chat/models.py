from django.db import models

# Define el modelo ChatGpt
class ChatGpt(models.Model):
    fecha_enviado = models.DateField(auto_now_add=True)  # Fecha y hora en que se envió el mensaje
    mensaje = models.CharField(max_length=144)  # Mensaje, limitado a 144 caracteres
    emisor = models.ForeignKey(
        'api.UsuarioT', 
        on_delete=models.CASCADE, 
        related_name='uwu'  # Relación inversa para el emisor
    )
    receptor = models.ForeignKey(
        'api.UsuarioT', 
        on_delete=models.CASCADE, 
        related_name='owo'  # Relación inversa para el receptor
    )
    servicio = models.ForeignKey(
        'api.Servicio', 
        on_delete=models.CASCADE  # Relación a Servicio
    )

    def __str__(self):
        return self.emisor.username  # Representación en cadena del modelo
