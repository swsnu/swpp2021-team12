from django.test import TestCase, Client
from user.models import User
from club.models import Club
import json

class ClubTestCase(TestCase):
    def setUp(self):
        User.objects.create_user(name='name1', password='pw1', email='aa@aa.aa')
        User.objects.create_user(name='name2', password='pw2', email='bb@bb.bb')
        User.objects.create_user(name='name3', password='pw3', email='cc@cc.cc')

    def test_club(self):
        client = Client()

        # unauthenticated
        response = client.get('/api/club/')
        self.assertEqual(response.status_code, 401)
        response = client.post('/api/club/')
        self.assertEqual(response.status_code, 401)

        # signin
        response = client.post('/api/user/sign_in/',
        json.dumps({'email': 'aa@aa.aa', 'password': 'pw1'}), content_type='application/json')

        # create a new club
        user = User.objects.get(name='name1')
        club = Club.objects.create(
            title='title1',
            content='content1',
            author=user
        )
        club.members.add(User.objects.get(name='name2'))
        club.pending_members.add(User.objects.get(name='name3'))
        club.save()

        # get clubs
        response = client.get('/api/club/')
        self.assertEqual(response.status_code, 200)

        # create a new club
        response = client.post('/api/club/',
        json.dumps({'title': 'title2', 'content': 'content2'}),
        content_type='application/json')
        self.assertEqual(response.status_code, 201)

        # KeyError
        response = client.post('/api/club/',
        json.dumps({'key': 'value'}), content_type='application/json')
        self.assertEqual(response.status_code, 400)

        # wrong request
        response = client.delete('/api/club/')
        self.assertEqual(response.status_code, 405)

    def test_specified_club(self):
        client = Client()

        # unauthenticated
        response = client.put('/api/club/1/')
        self.assertEqual(response.status_code, 401)
        response = client.delete('/api/club/1/')
        self.assertEqual(response.status_code, 401)

        # signin, Club DoesNotExist
        response = client.post('/api/user/sign_in/',
        json.dumps({'email': 'aa@aa.aa', 'password': 'pw1'}), content_type='application/json')
        response = client.put('/api/club/1/')
        self.assertEqual(response.status_code, 404)
        response = client.delete('/api/club/1/')
        self.assertEqual(response.status_code, 404)

        # create a new club
        user = User.objects.get(name='name1')
        club = Club.objects.create(
            title='title1',
            content='content1',
            author=user
        )
        club.members.add(User.objects.get(name='name2'))
        club.pending_members.add(User.objects.get(name='name3'))
        club.save()
        club_id = club.id
        
        # KeyError
        response = client.put('/api/club/' + str(club_id) + '/',
        json.dumps({'title': 't', 'content': 'c', 'key': 'value'}), content_type='application/json')
        self.assertEqual(response.status_code, 400)

        # edit club
        response = client.put('/api/club/' + str(club_id) + '/',
        json.dumps({'title': 'newTitle', 'content': 'newContent', 'kick_members': [1]}),
        content_type='application/json')
        self.assertEqual(response.status_code, 200)

        # sign out & sign in with another user
        response = client.get('/api/user/sign_out/')
        response = client.post('/api/user/sign_in/',
        json.dumps({'email': 'bb@bb.bb', 'password': 'pw2'}), content_type='application/json')
        response = client.put('/api/club/' + str(club_id) + '/',
        json.dumps({'title': 't', 'content': 'c', 'kick_members': []}), content_type='application/json')
        self.assertEqual(response.status_code, 403)
        response = client.delete('/api/club/' + str(club_id) + '/')
        self.assertEqual(response.status_code, 403)

        # delete club
        response = client.get('/api/user/sign_out/')
        response = client.post('/api/user/sign_in/',
        json.dumps({'email': 'aa@aa.aa', 'password': 'pw1'}), content_type='application/json')
        response = client.delete('/api/club/' + str(club_id) + '/')
        self.assertEqual(response.status_code, 200)

        # wrong request
        response = client.post('/api/club/' + str(club_id) + '/')
        self.assertEqual(response.status_code, 405)

    def test_toggle_club(self):
        client = Client()

        # unauthenticated
        response = client.put('/api/club/1/toggle/')
        self.assertEqual(response.status_code, 401)

        # sign in, club DoesNotExist
        response = client.post('/api/user/sign_in/',
        json.dumps({'email': 'aa@aa.aa', 'password': 'pw1'}), content_type='application/json')
        response = client.put('/api/club/1/toggle/')
        self.assertEqual(response.status_code, 404)

        # create a new club
        user = User.objects.get(name='name1')
        club = Club.objects.create(
            title='title1',
            content='content1',
            author=user
        )
        club.save()
        club_id = club.id

        # KeyError
        response = client.put('/api/club/' + str(club_id) + '/toggle/',
        json.dumps({'key': 'value'}), content_type='application/json')
        self.assertEqual(response.status_code, 400)

        # sign out & sign in with another user
        response = client.get('/api/user/sign_out/')
        response = client.post('/api/user/sign_in/',
        json.dumps({'email': 'bb@bb.bb', 'password': 'pw2'}), content_type='application/json')

        # join
        response = client.put('/api/club/' + str(club_id) + '/toggle/',
        json.dumps({'join_or_quit': 1}), content_type='application/json')
        self.assertEqual(response.status_code, 200)

        # quit
        club.members.add(User.objects.get(name='name2'))
        response = client.put('/api/club/' + str(club_id) + '/toggle/',
        json.dumps({'join_or_quit': 0}), content_type='application/json')
        self.assertEqual(response.status_code, 200)

        # wrong request
        response = client.get('/api/club/' + str(club_id) + '/toggle/')
        self.assertEqual(response.status_code, 405)

    def test_handle_pending(self):
        client = Client()
        
        # unauthenticated
        response = client.get('/api/club/1/pending/')
        self.assertEqual(response.status_code, 401)
        response = client.put('/api/club/1/pending/')
        self.assertEqual(response.status_code, 401)

        # sign in, club DoesNotExist
        response = client.post('/api/user/sign_in/',
        json.dumps({'email': 'aa@aa.aa', 'password': 'pw1'}), content_type='application/json')
        response = client.get('/api/club/1/pending/')
        self.assertEqual(response.status_code, 404)
        response = client.put('/api/club/1/pending/')
        self.assertEqual(response.status_code, 404)

        # create a new club
        user = User.objects.get(name='name1')
        club = Club.objects.create(
            title='title1',
            content='content1',
            author=user
        )
        club.pending_members.add(User.objects.get(name='name2'))
        club.pending_members.add(User.objects.get(name='name3'))
        club.save()
        club_id = club.id

        # KeyError
        response = client.put('/api/club/' + str(club_id) + '/pending/',
        json.dumps({'pending_id': 1, 'key': 'value'}), content_type='application/json')
        self.assertEqual(response.status_code, 400)

        # get all pendings
        response = client.get('/api/club/' + str(club_id) + '/pending/')
        self.assertEqual(response.status_code, 200)

        # accept
        response = client.put('/api/club/' + str(club_id) + '/pending/',
        json.dumps({'pending_id': 2, 'accept_or_refuse': 1}), content_type='application/json')
        self.assertEqual(response.status_code, 200)

        # refuse
        response = client.put('/api/club/' + str(club_id) + '/pending/',
        json.dumps({'pending_id': 3, 'accept_or_refuse': 0}), content_type='application/json')
        self.assertEqual(response.status_code, 200)

        # wrong request
        response = client.post('/api/club/' + str(club_id) + '/pending/')
        self.assertEqual(response.status_code, 405)