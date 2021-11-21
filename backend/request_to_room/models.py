from django.db import models
from user.models import User
from room.models import Room

class RequestToRoom(models.Model):
    room = models.ForeignKey(
        Room,
        on_delete=models.CASCADE,
        related_name='room'
    )
    requester = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='requester_room'
    )
    content = models.TextField()
    time = models.DateTimeField()
    people = models.IntegerField()