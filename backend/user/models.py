from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin

class UserManager(BaseUserManager):
    use_in_migrations = True
    def create_user(self, name, password, email):
        user = self.model(name=name, email=email)
        user.set_password(password)
        user.save(using=self._db)
        return user
    
    def create_superuser(self, name, email, password):
        if password is None:
            raise TypeError('Superusers must have a password.')
        user = self.create_user(name, password, email)
        user.is_superuser = True
        user.save()
        return user

class User(AbstractBaseUser, PermissionsMixin):
    name = models.CharField(max_length=20, unique=True, default=None)
    email = models.CharField(max_length=30, unique=True, null=True, default=None)
    password = models.CharField(max_length=100, null=True, default=None)
    self_intro = models.TextField(null=True)
    profile_img = models.ImageField(blank=True,null=True,upload_to='profile/')

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name']

    @property
    def is_staff(self):
        return self.is_superuser

    class Meta:
        db_table = 'user'
        ordering = ['-pk']
