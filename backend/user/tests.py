from django.test import TestCase, Client
from .models import User
import json

class UserTestCase(TestCase):
    
    def test_superuser(self):
        User.objects.create_superuser(email="rr@rr.rr",password="ff")
        with self.assertRaises(TypeError):
            User.objects.create_superuser(email=None,password=None)

    def test_sign(self):
        client = Client()
        response = client.post('/api/user/sign_up/',
        json.dumps({'email':'tt@tt.tt','password':'tt','name':'tt'}),content_type="application/json")

        self.assertEqual(response.status_code,200)

        response = client.get('/api/user/sign_out/')

        self.assertEqual(response.status_code,204)

        response = client.post('/api/user/sign_in/',
        json.dumps({'email':'tt@tt.tt','password':'tt'}),content_type="application/json")
        
        self.assertEqual(response.status_code,200)
        self.assertIn('tt',response.content.decode())

    def test_sign_fail(self):
        client = Client()

        response = client.post('/api/user/sign_in/',
        json.dumps({'email':'tt@tt.tt','password':'tt'}),content_type="application/json")     
        self.assertEqual(response.status_code,401)
        response = client.post('/api/user/sign_in/',
        json.dumps({'email':'tt@tt.tt'}),content_type="application/json") 
        self.assertEqual(response.status_code,400)
        response = client.get('/api/user/sign_in/')
        self.assertEqual(response.status_code,405)

        response = client.get('/api/user/sign_out/')
        self.assertEqual(response.status_code,401)
        response = client.post('/api/user/sign_out/')
        self.assertEqual(response.status_code,405)


        response = client.post('/api/user/sign_up/',
        json.dumps({'email':'tt@tt.tt','password':'tt'}),content_type="application/json")
        self.assertEqual(response.status_code,400)
        response = client.post('/api/user/sign_up/',
        json.dumps({'email':None,'password':None,'name':None}),content_type="application/json")
        self.assertEqual(response.status_code,409)
        response = client.get('/api/user/sign_up/')
        self.assertEqual(response.status_code,405)

        

       
       

    def test_token(self):
        client = Client()
        response = client.get('/api/user/token/')

        self.assertEqual(response.status_code,204)

        response = client.post('/api/user/token/')

        self.assertEqual(response.status_code,405)



# Create your tests here.
