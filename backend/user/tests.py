from django.test import TestCase, Client
from .models import User

class UserTestCase(TestCase):
    def  setUp(self):
        User.objects.create(email="test@te.st", name="test", password="te")

    def test_user_field(self):
        u = User.objects.get(email="test@te.st")
        u.name.assertEqual("test")
        u.email.assertEqual("test@te.st")
        u.password.assertEqual("te")
        u.is_active.assertEqual(True)
        u.is_staff.assertEqual(False)
        u.is_superuser.assertEqusl(False)


# Create your tests here.
