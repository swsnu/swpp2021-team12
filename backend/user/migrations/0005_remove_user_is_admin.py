# Generated by Django 3.2.7 on 2021-11-12 05:25

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0004_user_is_admin'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='is_admin',
        ),
    ]