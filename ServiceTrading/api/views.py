# views.py

from rest_framework.decorators import action
import json
from rest_framework import viewsets, filters
from .serializer import UsuarioSerializer, ServicioSerializer, InteraccionSerializer, ValoracionSerializer
from .models import Usuario, Servicio, Interaccion, UsuarioT, Valoracion
from rest_framework.views import APIView
from django.contrib.auth.models import User
from rest_framework.response import Response
from django.contrib.auth import authenticate
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from datetime import timedelta
from rest_framework.permissions import IsAuthenticated

class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        perfil = UsuarioT.objects.get(user=user)
        return Response({
            'username': user.username,
            'email': user.email,
            'usuario_id': user.id,
            'edad': perfil.edad,
            'lugar_vivienda': perfil.lugar_vivienda
        })

    def post(self, request):
        user = request.user
        perfil = UsuarioT.objects.get(user=user)

        perfil.edad = request.data.get('edad')
        perfil.lugar_vivienda = request.data.get('lugar_vivienda')
        perfil.save()

        return Response({'message': 'Perfil actualizado correctamente'})


class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer

class ServicioViewSet(viewsets.ModelViewSet):
    queryset = Servicio.objects.all()
    serializer_class = ServicioSerializer

    def get_queryset(self):
        usuario_id = self.request.query_params.get('usuario_id')
        if usuario_id:
            return self.queryset.filter(usuario_id=usuario_id)
        return self.queryset

    @action(detail=True, methods=['patch'])
    def update_service(self, request, pk=None):
        try:
            service = self.get_object()
            serializer = self.get_serializer(service, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Servicio.DoesNotExist:
            return Response({'error': 'Servicio no encontrado'}, status=status.HTTP_404_NOT_FOUND)

    @action(detail=True, methods=['delete'])
    def delete_service(self, request, pk=None):
        try:
            service = self.get_object()
            service.delete()
            return Response({'message': 'Servicio eliminado'}, status=status.HTTP_204_NO_CONTENT)
        except Servicio.DoesNotExist:
            return Response({'error': 'Servicio no encontrado'}, status=status.HTTP_404_NOT_FOUND)

    
class InteraccionViewSet(viewsets.ModelViewSet):
    queryset = Interaccion.objects.all()
    serializer_class = InteraccionSerializer
    
class ValoracionViewSet(viewsets.ModelViewSet):
    queryset = Valoracion.objects.all()
    serializer_class = ValoracionSerializer

    # Filtro para permitir obtener valoraciones por servicio
    def get_queryset(self):
        servicio_id = self.request.query_params.get('servicio')
        if servicio_id:
            return self.queryset.filter(servicio=servicio_id)
        return self.queryset
     

class RegistroView(APIView):
    def post(self,request):
        username = request.data.get('username')
        email = request.data.get('email')
        password = request.data.get('password')
        
        if User.objects.filter(email=email).exists():
            return Response({'error': 'El correo ya está registrado'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            crear_usuario = User.objects.create_user(username=username, email=email,password=password)
            
            UsuarioT.objects.create(user=crear_usuario)
            
            return Response({'success': 'Usuario Registrado'}, status=status.HTTP_201_CREATED)
        

        
from rest_framework_simplejwt.tokens import RefreshToken


class LoginView(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        try:
            user = User.objects.get(email=email)
            usuario_t = UsuarioT.objects.get(user=user)
        except (User.DoesNotExist, UsuarioT.DoesNotExist):
            return Response({'error': 'Usuario no encontrado'}, status=status.HTTP_404_NOT_FOUND)

        if authenticate(request, username=user.username, password=password):
            refresh = RefreshToken.for_user(user)

            response = Response({
                'access_token': str(refresh.access_token),
                'refresh_token': str(refresh),
                'email': user.email,
                'usuario_id': usuario_t.id,  # Send UsuarioT ID
            }, status=status.HTTP_200_OK)

            response.set_cookie(
                'user',
                json.dumps({'usuario_id': usuario_t.id, 'email': user.email}),
                max_age=60 * 60 * 24,  # 1 day
                httponly=False,
                samesite='Lax'
            )
            response.set_cookie(
                'access_token',
                str(refresh.access_token),
                max_age=60 * 60 * 24,  # 1 day
                httponly=True,
                samesite='Lax'
            )

            return response
        else:
            return Response({'error': 'Credenciales incorrectas'}, status=status.HTTP_400_BAD_REQUEST)
