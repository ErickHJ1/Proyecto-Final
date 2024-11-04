from django.urls import path, include

from .views import ChatGPTIDView, ChatGPTView



urlpatterns = [
    path("chat/caliente/", ChatGPTView.as_view()),
    path("chat/caliente/privado/<int:receptor>/", ChatGPTIDView.as_view()),
]