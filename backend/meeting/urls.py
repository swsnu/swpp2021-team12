from django.urls import path
from meeting import views

urlpatterns = [
    path('', views.meeting_, name='meeting'),
    path('<int:meeting_id>/', views.specified_meeting, name='specified_meeting'),
    path('<int:meeting_id>/photo/', views.meeting_photo, name='meeting_photo'),
    path('<int:meeting_id>/toggle/', views.toggle_meeting, name='toggle_meeting'),
    path('joined/', views.joined_meeting, name='joined_meeting'),
]