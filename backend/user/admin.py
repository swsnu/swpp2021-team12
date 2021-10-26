from django.contrib import admin
from user.models import User

class UserAdmin(admin.ModelAdmin):
    pass

admin.site.register(User, UserAdmin)

# Register your models here.
