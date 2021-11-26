from django.db import models
from user.models import User

class Meeting(models.Model):
    title = models.CharField(max_length=50)
    content = models.TextField()
    author = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='meeting_author'
    )
    current_members = models.ManyToManyField(
        User,
        related_name='members'
    )
    max_members = models.IntegerField()
    photo = models.ImageField(blank=True,null=True,upload_to='profile/')
    time = models.IntegerField(null=True,blank=False)
    description = models.CharField(max_length=50,null=True,blank=False)
    lat = models.FloatField(null=True,blank=False)
    lng = models.FloatField(null=True,blank=False)
    # access_scope
    # tag
    # location
    # photo