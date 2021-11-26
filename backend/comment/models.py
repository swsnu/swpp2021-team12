from django.db import models
from user.models import User
from meeting.models import Meeting
from room.models import Room

class Comment(models.Model):
    content = models.TextField()
    section = models.CharField(max_length=10)
    author = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='comment_author'
    )
    meeting = models.ForeignKey(
        Meeting,
        on_delete=models.CASCADE,
        related_name='meeting',
        null=True
    )
    room = models.ForeignKey(
        Room,
        on_delete=models.CASCADE,
        related_name='room',
        blank=True,
        null=True
    )
