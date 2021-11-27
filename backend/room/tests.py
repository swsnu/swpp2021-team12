from django.test import TestCase, Client
from .models import Room
from user.models import User
import json

# Create your tests here.

class RoomTestCase(TestCase):
    client = None
    def setUp(self):
        self.client = Client()
        self.client.post('/api/user/sign_up/', json.dumps({"name":"aaaa", "email":"aa@aa.a", "password":"aaaa"}), content_type='application/json')
        self.client.post('/api/user/sign_in/', json.dumps({"name":"aaaa", "email":"aa@aa.a", "password":"aaaa"}), content_type='application/json')

    def test_register_room(self):
        c = self.client
        res = c.get('/api/room/')
        self.assertEqual(res.status_code, 405)
        res = c.post('/api/room/')
        self.assertEqual(res.status_code, 400)
        res = c.post('/api/room/', json.dumps({"title":"a", "description":"aa", "capacity":10, "address":"aaa", "dates":[]}), content_type='application/json')
        self.assertEqual(res.status_code, 201)

    def test_room(self):
        c = self.client
        c.post('/api/room/', json.dumps({"title":"a", "description":"aa", "capacity":10, "address":"aaa", "dates":[]}), content_type='application/json')
        res = c.delete('/api/room/1/')
        self.assertEqual(res.status_code, 405)
        res = c.get('/api/room/2/')
        self.assertEqual(res.status_code, 404)
        res = c.get('/api/room/1/')
        self.assertEqual(res.status_code, 200)
    
    def test_host_room(self):
        c = self.client
        res = c.post('/api/room/host/')
        self.assertEqual(res.status_code, 405)
        res = c.get('/api/room/host/')
        self.assertEqual(res.status_code, 404)
        res = c.put('/api/room/host/')
        self.assertEqual(res.status_code, 404)
        res = c.delete('/api/room/host/')
        self.assertEqual(res.status_code, 404)
        c.post('/api/room/', json.dumps({"title":"a", "description":"aa", "capacity":10, "address":"aaa", "dates":[]}), content_type='application/json')
        res = c.get('/api/room/host/')
        self.assertEqual(res.status_code, 200)
        res = c.put('/api/room/host/', json.dumps({"title":"b", "description":"bb", "capacity":5, "address":"bbb", "dates":[]}), content_type='application/json')
        self.assertEqual(res.status_code, 200)
        res = c.put('/api/room/host/')
        self.assertEqual(res.status_code, 400)
        res = c.delete('/api/room/host/')
        self.assertEqual(res.status_code, 200)
