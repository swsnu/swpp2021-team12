from django.urls import path
from meeting import views

urlpatterns = [
    path('', views.meeting_, name='meeting'),
    path('<int:meeting_id>/', views.specified_meeting, name='specified_meeting'),
    path('<int:meeting_id>/toggle/', views.toggle_meeting, name='toggle_meeting'),
    path('author/<int:author_id>/', views.meeting_by_author, name='meeting_by_author'),
]