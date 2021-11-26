from django.urls import path
from club import views

urlpatterns = [
    path('', views.club_, name='club'),
    path('<int:club_id>/', views.specified_club, name='specified_club'),
    path('<int:club_id>/toggle/', views.toggle_club, name='toggle_club'),
]