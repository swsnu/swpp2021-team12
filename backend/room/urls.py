from django.urls import path
from room import views

urlpatterns = [
    path('', views.register_room, name='register_room'),
    path('<int:room_id>/', views.room, name='room'),
    path('host/', views.host_room, name='host_room'),
    path('user/<int:user_id>/', views.user_room, name='user_room'),
]