from django.test import TestCase, Client
from .models import User
import json

class UserTestCase(TestCase):

    
    
    def test_superuser(self):
        User.objects.create_superuser(email="rr@rr.rr",password="ff",name="kk")
        with self.assertRaises(TypeError):
            User.objects.create_superuser(email=None,password=None,name=None)

    def test_sign(self):
        client = Client()
        response = client.post('/api/user/sign_up/',
                               json.dumps({'email':'tt@tt.tt','password':'tt','name':'tt'}),
                               content_type="application/json")

        self.assertEqual(response.status_code,201)

        response = client.get('/api/user/sign_out/')

        self.assertEqual(response.status_code,204)

        response = client.post('/api/user/sign_in/',
        json.dumps({'email':'tt@tt.tt','password':'tt'}),content_type="application/json")
        
        self.assertEqual(response.status_code,200)
        self.assertIn('tt',response.content.decode())

    def test_sign_fail(self):
        client = Client()
        signin = '/api/user/sign_in/'
        signup = '/api/user/sign_up/'
        signout = '/api/user/sign_out/'
        jsontype = "application/json"

        response = client.post(signin,
        json.dumps({'email':'tt@tt.tt','password':'tt'}),content_type=jsontype )     
        self.assertEqual(response.status_code,401)
        response = client.post(signin,
        json.dumps({'email':'tt@tt.tt'}),content_type=jsontype ) 
        self.assertEqual(response.status_code,400)
        response = client.get(signin)
        self.assertEqual(response.status_code,405)

        response = client.get(signout)
        self.assertEqual(response.status_code,401)
        response = client.post(signout)
        self.assertEqual(response.status_code,405)


        response = client.post(signup,
        json.dumps({'email':'tt@tt.tt','password':'tt'}),content_type=jsontype )
        self.assertEqual(response.status_code,400)
        response = client.post(signup,
        json.dumps({'email':None,'password':None,'name':None}),content_type=jsontype )
        self.assertEqual(response.status_code,409)
        response = client.get(signup)
        self.assertEqual(response.status_code,405)

        

       
       

    def test_token(self):
        client = Client()
        token = '/api/user/token/'
        response = client.get(token )

        self.assertEqual(response.status_code,204)

        response = client.post(token )

        self.assertEqual(response.status_code,405)



# Create your tests here.
