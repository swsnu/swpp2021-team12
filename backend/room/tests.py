from django.test import TestCase, Client
from .models import Room,Date,RoomRequest
from user.models import User
import json

# Create your tests here.

class RoomTestCase(TestCase):
    client = None
    def setUp(self):
        self.client = Client()
        self.client.post('/api/user/sign_up/', json.dumps({"name":"aaaa", "email":"aa@aa.a",
         "password":"aaaa"}), content_type='application/json')
        self.client.post('/api/user/sign_in/', json.dumps({"name":"aaaa", "email":"aa@aa.a",
         "password":"aaaa"}), content_type='application/json')

    def test_register_room(self):
        c = self.client
        res = c.delete('/api/room/')
        self.assertEqual(res.status_code, 405)
        res = c.post('/api/room/')
        self.assertEqual(res.status_code, 400)
        res = c.post('/api/room/', json.dumps({"title":"a", "description":"aa", "capacity":10,
         "address":"aaa", "dates":["20211210"],"lat":1,"lng":1}), content_type='application/json')
        self.assertEqual(res.status_code, 201)
        res = c.get('/api/room/')
        self.assertEqual(res.status_code,200)

    def test_room(self):
        c = self.client
        c.post('/api/room/', json.dumps({"title":"a", "description":"aa", "capacity":10,
         "address":"aaa", "dates":["20211210"],"lat":1,"lng":1}), content_type='application/json')
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
        c.post('/api/room/', json.dumps({"title":"a", "description":"aa", "capacity":10, "address":"aaa",
         "dates":["20211210"],"lat":1,"lng":1}), content_type='application/json')
        d = Date.objects.create(date='20211210',room=Room.objects.get(id=1),
        current_mem_num=1,year=2021,month=12,day=10)
        d.save()
        request = RoomRequest.objects.create(requester=User.objects.get(id=1),
        request_date=Date.objects.get(id=1))
        request.save()
        d = Date.objects.create(date='20211211',room=Room.objects.get(id=1),
        current_mem_num=1,year=2021,month=12,day=11)
        d.save()
        request = RoomRequest.objects.create(requester=User.objects.get(id=1),
        request_date=Date.objects.get(id=2))
        request.save()
        res = c.get('/api/room/host/')
        self.assertEqual(res.status_code, 200)
        res = c.put('/api/room/host/', json.dumps({"title":"b", "description":"bb", "capacity":5, "address":"bbb",
         "dates":["20211210"],"lat":1,"lng":1}), content_type='application/json')
        self.assertEqual(res.status_code, 200)
        res = c.put('/api/room/host/', json.dumps({"title":"b", "description":"bb", "capacity":5, "address":"bbb",
         "dates":["20211211"],"lat":1,"lng":1}), content_type='application/json')
        self.assertEqual(res.status_code, 200)
        res = c.put('/api/room/host/')
        self.assertEqual(res.status_code, 400)
        res = c.delete('/api/room/host/')
        self.assertEqual(res.status_code, 200)

    def test_create_pending(self):
        c = self.client
        c.post('/api/room/', json.dumps({"title":"a", "description":"aa", "capacity":10, "address":"aaa",
         "dates":["20211210"],"lat":1,"lng":1}), content_type='application/json')
        d = Date.objects.create(date='20211210',room=Room.objects.get(id=1),
        current_mem_num=1,year=2021,month=12,day=10)
        d.save()
        res = c.post('/api/room/1/pending/',json.dumps({'date':'20211210'}), content_type='application/json')
        self.assertEqual(res.status_code,201)
        res = c.post('/api/room/2/pending/',json.dumps({'date':'20211210'}), content_type='application/json')
        self.assertEqual(res.status_code,404)
        res = c.post('/api/room/1/pending/',json.dumps({'dat':'20211211'}), content_type='application/json')
        self.assertEqual(res.status_code,400)
        res = c.get('/api/room/1/pending/')
        self.assertEqual(res.status_code,405)

    def test_handle_pending(self):
        c = self.client
        c.post('/api/room/', json.dumps({"title":"a", "description":"aa", "capacity":10, "address":"aaa",
         "dates":["20211210"],"lat":1,"lng":1}), content_type='application/json')
        d = Date.objects.create(date='20211210',room=Room.objects.get(id=1),
        current_mem_num=1,year=2021,month=12,day=10)
        d.save()
        request = RoomRequest.objects.create(requester=User.objects.get(id=1),
        request_date=Date.objects.get(id=1))
        request.save()
        d = Date.objects.create(date='20211211',room=Room.objects.get(id=1),
        current_mem_num=1,year=2021,month=12,day=11)
        d.save()
        request = RoomRequest.objects.create(requester=User.objects.get(id=1),
        request_date=Date.objects.get(id=2))
        request.save()
        res = c.put('/api/room/host/pending/',json.dumps({'pending_id':2,'accept_or_refuse':0})
        , content_type='application/json')
        self.assertEqual(res.status_code,200)
        res = c.put('/api/room/host/pending/',json.dumps({'pending_id':1,'accept_or_refuse':1})
        , content_type='application/json')
        self.assertEqual(res.status_code,200)
        res = c.put('/api/room/host/pending/',json.dumps({'pending_id':3,'accept_or_refuse':1})
        , content_type='application/json')
        self.assertEqual(res.status_code,404)
        res = c.put('/api/room/host/pending/',json.dumps({'pending':1,'accept_or_refuse':1})
        , content_type='application/json')
        self.assertEqual(res.status_code,400)
        room = Room.objects.get(id=1)
        room.delete()
        res = c.put('/api/room/host/pending/',json.dumps({'pending_id':2,'accept_or_refuse':0})
        , content_type='application/json')
        self.assertEqual(res.status_code,404)
        res = c.get('/api/room/host/pending/')
        self.assertEqual(res.status_code,405)