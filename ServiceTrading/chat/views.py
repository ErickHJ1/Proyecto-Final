from django.shortcuts import render
from rest_framework.generics import ListCreateAPIView,ListAPIView
from rest_framework.response import Response
from .models import ChatGpt
from .serialiazer import ChatGptSerializer
from chat import models
from rest_framework.views import APIView


class ChatGPTView(ListCreateAPIView):
    queryset = ChatGpt.objects.all()
    serializer_class = ChatGptSerializer
    
    
class ChatGPTIDView(ListAPIView):
    queryset = ChatGpt.objects.all()
    serializer_class = ChatGptSerializer
    lookup_field = 'receptor'
    
    def get_queryset(self):
        receptor = self.kwargs.get(self.lookup_field)
        return ChatGpt.objects.filter(receptor=receptor)
    
    