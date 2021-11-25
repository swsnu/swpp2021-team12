from django.urls import path
from comment import views

urlpatterns = [
    path('', views.comment_, name='comment'),
    path('<int:comment_id>/', views.specified_comment, name='specified_comment'),
    path('room/<int:room_id>/', views.room_comment, name='room_comment'),
    path('meeting/<int:meeting_id>/', views.meeting_comment, name='meeting_comment'),
]