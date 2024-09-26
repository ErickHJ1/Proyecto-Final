from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from rest_framework import status
from rest_framework.decorators import api_view
# Create your views here.

class registerView(APIView):
    def post(self, request):
        username = request.data.get('nombre')
        password = request.data.get('contraseña')
        
        if User.objects.filter(username=username).exists():
            return Response({'error':'usuario ya existe'},status=status.HTTP_400_BAD_REQUEST)
        
        nuevo_usuario = User.objects.create_user(username=username,password=password)
        return Response({'Success':'usuario'},status=status.HTTP_201_CREATED)
