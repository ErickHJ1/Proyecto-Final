from rest_framework import serializers

from chat.models import ChatGpt

class ChatGptSerializer(serializers.ModelSerializer):
    
    emisor = serializers.CharField(source='emisor.user.username')
    
    class Meta:
        model = ChatGpt
        fields = ['fecha_enviado', 'mensaje', 'emisor','receptor', 'servicio']
        
