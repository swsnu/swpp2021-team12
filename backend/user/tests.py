from django.test import TestCase, Client
from .models import User
import json
from django.core.files.uploadedfile import SimpleUploadedFile
import io
from PIL import Image

class UserTestCase(TestCase):

    
    
    def test_superuser(self):
        User.objects.create_superuser(email="rr@rr.rr",password="ff")
        with self.assertRaises(TypeError):
            User.objects.create_superuser(email=None,password=None)

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
        self.assertIn('1',response.content.decode())

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

    def test_check_signin(self):
        client = Client()
        check = '/api/user/check_signin/'
        response = client.post('/api/user/sign_up/',
                               json.dumps({'email':'tt@tt.tt','password':'tt','name':'tt'}),
                               content_type="application/json")

        response = client.get(check)
        self.assertEqual(response.status_code,200)
        response = client.get('/api/user/sign_out/')
        response = client.get(check)
        self.assertEqual(response.status_code,401)
        response = client.delete(check)
        self.assertEqual(response.status_code,405)

    def test_user_deatil(self):
        client = Client()
        signin = '/api/user/sign_in/'
        signup = '/api/user/sign_up/'
        signout = '/api/user/sign_out/'
        userdetail = '/api/user/'

        response = client.post(signup,json.dumps({'email':'tt@tt.tt','password':'tt','name':'tt'}),
                               content_type="application/json")
        response = client.get(userdetail+'1/')
        self.assertEqual(response.status_code,200)
        response = client.put(userdetail+'1/',json.dumps({'self_intro':"tt"}))
        self.assertEqual(response.status_code,200)
        photo = SimpleUploadedFile("file.png", b"file_content", content_type="image/png")
        response = client.post(userdetail+'1/profile/',{"profile":photo})
        self.assertEqual(response.status_code,200)
        response = client.delete(userdetail+'1/profile/')
        self.assertEqual(response.status_code,200)

        response = client.put(userdetail+'1/',json.dumps({'self_into':"tt"}))
        self.assertEqual(response.status_code,400)
        response = client.post(userdetail+'1/')
        self.assertEqual(response.status_code,405)
        response = client.get(userdetail+'1/profile/')
        self.assertEqual(response.status_code,404)
        response = client.post(userdetail+'1/profile/',{'profile':"asdasd"})
        self.assertEqual(response.status_code,400)
        response = client.put(userdetail+'1/profile/',{'profile':"asdasd"})
        self.assertEqual(response.status_code,405)
        client.get(signout)
        response = client.put(userdetail+'1/',json.dumps({'self_into':"tt"}))
        self.assertEqual(response.status_code,401)
        response = client.get(userdetail+'1/')
        self.assertEqual(response.status_code,401)
        response = client.get(userdetail+'1/profile/')
        self.assertEqual(response.status_code,401)
        response = client.post(userdetail+'1/profile/',{'profile':"asdasd"})
        self.assertEqual(response.status_code,401)
        response = client.delete(userdetail+'1/profile/')
        self.assertEqual(response.status_code,401)

       
       

    def test_token(self):
        client = Client()
        token = '/api/user/token/'
        response = client.get(token )

        self.assertEqual(response.status_code,204)

        response = client.post(token )

        self.assertEqual(response.status_code,405)



# Create your tests here.
