# Generated by Django 3.1.2 on 2021-12-13 12:38

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('club', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Meeting',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=50)),
                ('content', models.TextField()),
                ('max_members', models.IntegerField()),
                ('photo', models.ImageField(blank=True, null=True, upload_to='profile/')),
                ('time', models.IntegerField(null=True)),
                ('description', models.CharField(max_length=50, null=True)),
                ('lat', models.FloatField(null=True)),
                ('lng', models.FloatField(null=True)),
                ('is_public', models.BooleanField(null=True)),
                ('accessible_clubs', models.ManyToManyField(related_name='meeting_accessible_clubs', to='club.Club')),
            ],
        ),
    ]
