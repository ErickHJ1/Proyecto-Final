from django.urls import path, include

from .views import ChatGPTIDView, ChatGPTView



urlpatterns = [
    path("chat/", ChatGPTView.as_view()),
    path("chat/privado/<int:receptor>/", ChatGPTIDView.as_view()),
]