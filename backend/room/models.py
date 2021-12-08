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
    lat = models.FloatField(null=True,blank=False)
    lng = models.FloatField(null=True,blank=False)
    dates = models.TextField(null=True)
    # access scope

class Date(models.Model):
    date = models.CharField(max_length=30)
    room = models.ForeignKey(
        Room,
        on_delete=models.CASCADE,
        related_name='date',
    )
    current_mem_num = models.IntegerField(default=0)
    year = models.CharField(max_length=4)
    month = models.CharField(max_length=4)
    day = models.CharField(max_length=4)