from django.test import TestCase, Client
from user.models import User
from comment.models import Comment
from meeting.models import Meeting
from room.models import Room
import json

class CommentTestCase(TestCase):
    def setUp(self):
        User.objects.create_user(name='name1', password='pw1', email='aa@aa.aa')
        User.objects.create_user(name='name2', password='pw2', email='bb@bb.bb')
        User.objects.create_user(name='name3', password='pw3', email='cc@cc.cc')

    def test_comment(self):
        client = Client()

        # unauthenticated
        response = client.post('/api/comment/')
        self.assertEqual(response.status_code, 401)

        # signin
        response = client.post('/api/user/sign_in/',
        json.dumps({'email': 'aa@aa.aa', 'password': 'pw1'}), content_type='application/json')

        user = User.objects.get(name='name1')
        # create a new meeting
        meeting = Meeting.objects.create(
            title='meeting title1',
            content='meeting content1',
            author=user,
            max_members=4
        )
        meeting.save()

        # create a new room
        room = Room.objects.create(
            title='room title1',
            description='room description1',
            capacity=4,
            host=user,
            address='address',
        )
        room.save()

        # create a new comment
        comment = Comment.objects.create(
            content='content1',
            section='meeting',
            author=user,
            meeting=meeting
        )
        comment.save()

        comment = Comment.objects.create(
            content='content2',
            section='room',
            author=user,
            room=room
        )
        comment.save()

        # test creating a new comment
        response = client.post('/api/comment/',
        json.dumps({'content': 'content3', 'section': 'meeting', 'articleId': 1}),
        content_type='application/json')
        self.assertEqual(response.status_code, 201)

        response = client.post('/api/comment/',
        json.dumps({'content': 'content4', 'section': 'room', 'articleId': 1}),
        content_type='application/json')
        self.assertEqual(response.status_code, 201)

        # KeyError
        response = client.post('/api/comment/',
        json.dumps({'key': 'value'}), content_type='application/json')
        self.assertEqual(response.status_code, 400)

        # wrong request
        response = client.get('/api/comment/')
        self.assertEqual(response.status_code, 405)

    def test_specified_comment(self):
        client = Client()

        # unauthenticated
        response = client.put('/api/comment/1/')
        self.assertEqual(response.status_code, 401)
        response = client.delete('/api/comment/1/')
        self.assertEqual(response.status_code, 401)

        # signin, Comment DoesNotExist
        response = client.post('/api/user/sign_in/',
        json.dumps({'email': 'aa@aa.aa', 'password': 'pw1'}), content_type='application/json')
        response = client.put('/api/comment/1/')
        self.assertEqual(response.status_code, 404)
        response = client.delete('/api/comment/1/')
        self.assertEqual(response.status_code, 404)

        user = User.objects.get(name='name1')
        # create a new meeting
        meeting = Meeting.objects.create(
            title='meeting title1',
            content='meeting content1',
            author=user,
            max_members=4
        )
        meeting.save()

        # create a new comment
        comment = Comment.objects.create(
            content='content1',
            section='meeting',
            author=user,
            meeting=meeting
        )
        comment.save()
        comment_id = comment.id

        # KeyError
        response = client.put('/api/comment/' + str(comment_id) + '/',
        json.dumps({'key': 'value'}), content_type='application/json')
        self.assertEqual(response.status_code, 400)

        # edit comment
        response = client.put('/api/comment/' + str(comment_id) + '/',
        json.dumps({'content': 'new content'}), content_type='application/json')
        self.assertEqual(response.status_code, 200)

        # sign out & sign in with another user
        response = client.get('/api/user/sign_out/')
        response = client.post('/api/user/sign_in/',
        json.dumps({'email': 'bb@bb.bb', 'password': 'pw2'}), content_type='application/json')
        response = client.put('/api/comment/' + str(comment_id) + '/',
        json.dumps({'content': 'new content'}), content_type='application/json')
        self.assertEqual(response.status_code, 403)
        response = client.delete('/api/comment/' + str(comment_id) + '/')
        self.assertEqual(response.status_code, 403)

        # delete comment
        response = client.get('/api/user/sign_out/')
        response = client.post('/api/user/sign_in/',
        json.dumps({'email': 'aa@aa.aa', 'password': 'pw1'}), content_type='application/json')
        response = client.delete('/api/comment/' + str(comment_id) + '/')
        self.assertEqual(response.status_code, 200)

        # wrong request
        response = client.get('/api/comment/' + str(comment_id) + '/')
        self.assertEqual(response.status_code, 405)

    def test_room_comment(self):
        client = Client()

        # unauthenticated
        response = client.get('/api/comment/room/1/')
        self.assertEqual(response.status_code, 401)

        # signin
        response = client.post('/api/user/sign_in/',
        json.dumps({'email': 'aa@aa.aa', 'password': 'pw1'}), content_type='application/json')

        user = User.objects.get(name='name1')
        # create a new meeting
        meeting = Meeting.objects.create(
            title='meeting title1',
            content='meeting content1',
            author=user,
            max_members=4
        )
        meeting.save()

        # create a new room
        room = Room.objects.create(
            title='room title1',
            description='room description1',
            capacity=4,
            host=user,
            address='address',
        )
        room.save()

        # create a new comment
        comment = Comment.objects.create(
            content='content1',
            section='meeting',
            author=user,
            meeting=meeting
        )
        comment.save()

        comment = Comment.objects.create(
            content='content2',
            section='room',
            author=user,
            room=room
        )
        comment.save()

        room_id = room.id
        response = client.get('/api/comment/room/' + str(room_id) + '/')
        self.assertEqual(response.status_code, 200)

        # wrong request
        response = client.post('/api/comment/room/' + str(room_id) + '/')
        self.assertEqual(response.status_code, 405)

    def test_meeting_comment(self):
        client = Client()

        # unauthenticated
        response = client.get('/api/comment/meeting/1/')
        self.assertEqual(response.status_code, 401)

        # signin
        response = client.post('/api/user/sign_in/',
        json.dumps({'email': 'aa@aa.aa', 'password': 'pw1'}), content_type='application/json')

        user = User.objects.get(name='name1')
        # create a new meeting
        meeting = Meeting.objects.create(
            title='meeting title1',
            content='meeting content1',
            author=user,
            max_members=4
        )
        meeting.save()

        # create a new room
        room = Room.objects.create(
            title='room title1',
            description='room description1',
            capacity=4,
            host=user,
            address='address',
        )
        room.save()

        # create a new comment
        comment = Comment.objects.create(
            content='content1',
            section='meeting',
            author=user,
            meeting=meeting
        )
        comment.save()

        comment = Comment.objects.create(
            content='content2',
            section='room',
            author=user,
            room=room
        )
        comment.save()

        meeting_id = meeting.id
        response = client.get('/api/comment/meeting/' + str(meeting_id) + '/')
        self.assertEqual(response.status_code, 200)

        # wrong request
        response = client.post('/api/comment/meeting/' + str(meeting_id) + '/')
        self.assertEqual(response.status_code, 405)