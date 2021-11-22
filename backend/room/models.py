from django.db import models
from user.models import User
# Create your models here.
class Room(models.Model):
    title = models.CharField(max_length=30)
    description = models.CharField(max_length=200)
    capacity = models.IntegerField(default=0)
    host = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='host_of_room'
    )
    address = models.TextField()

    # dates available
    # access scope
    