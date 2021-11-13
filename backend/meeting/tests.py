from django.test import TestCase, Client
from user.models import User
from meeting.models import Meeting
import json

class MeetingTestCase(TestCase):
    def setUp(self):
        User.objects.create_user(name='name1', password='pw1', email='aa@aa.aa')
        User.objects.create_user(name='name2', password='pw2', email='bb@bb.bb')
        User.objects.create_user(name='name3', password='pw3', email='cc@cc.cc')

    def test_meeting(self):
        client = Client()

        # unauthenticated
        response = client.get('/api/meeting/')
        self.assertEqual(response.status_code, 401)
        response = client.post('/api/meeting/')
        self.assertEqual(response.status_code, 401)

        # signin
        response = client.post('/api/user/sign_in/',
        json.dumps({'email': 'aa@aa.aa', 'password': 'pw1'}), content_type='application/json')
        
        # # no meeting
        # response = client.get('/api/meeting/')
        # self.assertEqual(response.status_code, 404)

        # create a new meeting
        user = User.objects.get(name='name1')
        meeting = Meeting.objects.create(
            title='title1',
            content='content1',
            author=user,
            max_members=4
        )
        meeting.current_members.add(user)
        meeting.save()

        # get meetings
        response = client.get('/api/meeting/')
        self.assertEqual(response.status_code, 200)

        # create a new meeting
        response = client.post('/api/meeting/',
        json.dumps({'title': 'title2', 'content': 'content2', 'maxMembers': 4}),
        content_type='application/json')
        self.assertEqual(response.status_code, 201)

        # KeyError
        response = client.post('/api/meeting/',
        json.dumps({'key': 'value'}), content_type='application/json')
        self.assertEqual(response.status_code, 400)

        # wrong request
        response = client.delete('/api/meeting/')
        self.assertEqual(response.status_code, 405)

    def test_specified_meeting(self):
        client = Client()

        # unauthenticated
        response = client.get('/api/meeting/1/')
        self.assertEqual(response.status_code, 401)
        response = client.put('/api/meeting/1/')
        self.assertEqual(response.status_code, 401)
        response = client.delete('/api/meeting/1/')
        self.assertEqual(response.status_code, 401)

        # signin, Meeting DoesNotExist
        response = client.post('/api/user/sign_in/',
        json.dumps({'email': 'aa@aa.aa', 'password': 'pw1'}), content_type='application/json')
        response = client.get('/api/meeting/1/')
        self.assertEqual(response.status_code, 404)
        response = client.put('/api/meeting/1/')
        self.assertEqual(response.status_code, 404)
        response = client.delete('/api/meeting/1/')
        self.assertEqual(response.status_code, 404)

        # create meeting
        user = User.objects.get(name='name1')
        meeting = Meeting.objects.create(
            title='title1',
            content='content1',
            author=user,
            max_members=4
        )
        meeting.current_members.add(user)
        meeting.save()
        meeting_id = meeting.id
        response = client.get('/api/meeting/' + str(meeting_id) + '/')
        self.assertEqual(response.status_code, 200)

        # KeyError
        response = client.put('/api/meeting/' + str(meeting_id) + '/',
        json.dumps({'title': 'abcde', 'content': 'fghij', 'key': 'value'}), content_type='application/json')
        self.assertEqual(response.status_code, 400)

        # edit meeting
        response = client.put('/api/meeting/' + str(meeting_id) + '/',
        json.dumps({'title': 'newTitle', 'content': 'newContent', 'maxMembers': 5}),
        content_type='application/json')
        self.assertEqual(response.status_code, 200)

        # sign out & sign in with another user
        response = client.get('/api/user/sign_out/')
        response = client.post('/api/user/sign_in/',
        json.dumps({'email': 'bb@bb.bb', 'password': 'pw2'}), content_type='application/json')
        response = client.put('/api/meeting/' + str(meeting_id) + '/',
        json.dumps({'title': 'title', 'content': 'content', 'maxMembers': 4}),
        content_type='application/json')
        self.assertEqual(response.status_code, 403)
        response = client.delete('/api/meeting/' + str(meeting_id) + '/')
        self.assertEqual(response.status_code, 403)

        # delete article
        response = client.get('/api/user/sign_out/')
        response = client.post('/api/user/sign_in/',
        json.dumps({'email': 'aa@aa.aa', 'password': 'pw1'}), content_type='application/json')
        response = client.delete('/api/meeting/' + str(meeting_id) + '/')
        self.assertEqual(response.status_code, 200)

        # wrong request
        response = client.post('/api/meeting/' + str(meeting_id) + '/')
        self.assertEqual(response.status_code, 405)

    def test_toggle_meeting(self):
        client = Client()

        # unauthenticated
        response = client.put('/api/meeting/1/toggle/')
        self.assertEqual(response.status_code, 401)

        # sign in, meeting DoesNotExist
        response = client.post('/api/user/sign_in/',
        json.dumps({'email': 'aa@aa.aa', 'password': 'pw1'}), content_type='application/json')
        response = client.put('/api/meeting/1/toggle/')
        self.assertEqual(response.status_code, 404)

        # create meeting
        user = User.objects.get(name='name1')
        meeting = Meeting.objects.create(
            title='title1',
            content='content1',
            author=user,
            max_members=4
        )
        meeting.current_members.add(user)
        meeting.save()
        meeting_id = meeting.id

        # KeyError
        response = client.put('/api/meeting/' + str(meeting_id) + '/toggle/',
        json.dumps({'key': 'value'}), content_type='application/json')
        self.assertEqual(response.status_code, 400)

        # sign out & sign in with another user
        response = client.get('/api/user/sign_out/')
        response = client.post('/api/user/sign_in/',
        json.dumps({'email': 'bb@bb.bb', 'password': 'pw2'}), content_type='application/json')
        
        # join
        response = client.put('/api/meeting/' + str(meeting_id) + '/toggle/',
        json.dumps({'joinOrQuit': 1}), content_type='application/json')
        self.assertEqual(response.status_code, 200)

        # quit
        response = client.put('/api/meeting/' + str(meeting_id) + '/toggle/',
        json.dumps({'joinOrQuit': 0}), content_type='application/json')
        self.assertEqual(response.status_code, 200)

        # wrong request
        response = client.get('/api/meeting/' + str(meeting_id) + '/toggle/')
        self.assertEqual(response.status_code, 405)

    def test_meeting_by_author(self):
        client = Client()

        # unauthenticated
        response = client.get('/api/meeting/author/1/')
        self.assertEqual(response.status_code, 401)

        # create meeting
        user = User.objects.get(name='name1')
        meeting = Meeting.objects.create(
            title='title1',
            content='content1',
            author=user,
            max_members=4
        )
        meeting.current_members.add(user)
        meeting.save()
        user = User.objects.get(name='name2')
        meeting = Meeting.objects.create(
            title='title2',
            content='content2',
            author=user,
            max_members=4
        )
        meeting.current_members.add(user)
        meeting.save()

        # get meetings by author
        response = client.post('/api/user/sign_in/',
        json.dumps({'email': 'aa@aa.aa', 'password': 'pw1'}), content_type='application/json')
        author_id = user.id
        response = client.get('/api/meeting/author/' + str(author_id) + '/')
        self.assertEqual(response.status_code, 200)

        # wrong method
        response = client.post('/api/meeting/author/' + str(author_id) + '/')
        self.assertEqual(response.status_code, 405)
