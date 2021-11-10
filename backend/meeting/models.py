from django.db import models
from user.models import User

class Meeting(models.Model):
    title = models.CharField(max_length=50)
    content = models.TextField()
    author = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='user'
    )
    current_members = models.ManyToManyField(
        User,
        related_name='members'
    )
    max_members = models.IntegerField()
    # access_scope
    # tag
    # location
    # photo