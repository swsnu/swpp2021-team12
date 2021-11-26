# Generated by Django 3.1.2 on 2021-11-25 16:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('meeting', '0005_meeting_photo'),
    ]

    operations = [
        migrations.AddField(
            model_name='meeting',
            name='description',
            field=models.CharField(max_length=50, null=True),
        ),
        migrations.AddField(
            model_name='meeting',
            name='lat',
            field=models.FloatField(null=True),
        ),
        migrations.AddField(
            model_name='meeting',
            name='lng',
            field=models.FloatField(null=True),
        ),
        migrations.AddField(
            model_name='meeting',
            name='time',
            field=models.IntegerField(null=True),
        ),
    ]