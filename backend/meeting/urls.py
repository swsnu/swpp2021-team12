from django.urls import path
from meeting import views

urlpatterns = [
    path('', views.meeting, name='meeting'),
    path('<int:id>/', views.specified_meeting, name='specified_meeting'),
    path('author/<int:author_id>', views.meeting_by_author, name='meeting_by_author')
]