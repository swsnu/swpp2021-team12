from django.db import models
from user.models import User

class Club(models.Model):
    title = models.CharField(max_length=50)
    content = models.TextField()
    author = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='club_author'
    )
    members = models.ManyToManyField(
        User,
        related_name='club_members'
    )
    pending_members = models.ManyToManyField(
        User,
        related_name='club_pending_members'
    )
