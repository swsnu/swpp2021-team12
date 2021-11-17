import json
from json.decoder import JSONDecodeError
from comment.models import Comment
from meeting.models import Meeting
# from room.models import Room
from user.models import User, UserManager
from django.http import HttpResponse, HttpResponseNotAllowed, HttpResponseBadRequest, JsonResponse
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_exempt
from django.shortcuts import render

# Create your views here.
def comment_(request):
    # create a new comment
    if request.method == 'POST':
        if not request.user.is_authenticated:
            return HttpResponse(status=401)
        try:
            body = request.body.decode()
            req_data = json.loads(body)
            content = req_data['content']
            section = req_data['section']
            article_id = req_data['articleId']
            author = request.user
        except (KeyError, JSONDecodeError) as error:
            return HttpResponseBadRequest(error)
        if section == 'meeting':
            meeting = Meeting.objects.get(id=article_id)
            comment = Comment(
                content=content,
                section=section,
                author=author,
                meeting=meeting,
            )
        # elif section == 'room':
        #     room = Room.objects.get(id=article_id)
        #     comment = Comment(
        #         content=content,
        #         section=section,
        #         author=author,
        #         room=room
        #     )
        comment.save()

        # Should I make a JsonResponse?
        return HttpResponse(status=201)

    else:
        return HttpResponseNotAllowed(['POST'])

def specified_comment(request, comment_id):
    # Is it required?
    if request.method == 'GET':
        return JsonResponse({'Success'})

    # edit comment
    elif request.method == 'PUT':
        if not request.user.is_authenticated:
            return HttpResponse(status=401)
        try:
            target_comment = Comment.objects.get(id=comment_id)
        except Comment.DoesNotExist:
            return HttpResponse(status=404)
        try:
            body = request.body.decode()
            req_data = json.loads(body)
            new_content = req_data['content']
        except (KeyError, JSONDecodeError) as error:
            return HttpResponseBadRequest(error)
        if target_comment.author.id != request.user.id:
            return HttpResponse(status=403)
        else:
            target_comment.content = new_content
            target_comment.save()
            return HttpResponse(status=200)

    # delete comment
    elif request.method == 'DELETE':
        if not request.user.is_authenticated:
            return HttpResponse(status=401)
        try:
            target_comment = Comment.objects.get(id=comment_id)
        except Comment.DoesNotExist:
            return HttpResponse(status=404)
        if target_comment.author.id != request.user.id:
            return HttpResponse(status=403)
        else:
            target_comment.delete()
            return HttpResponse(status=200)

    # wrong request
    else:
        return HttpResponseNotAllowed(['GET', 'PUT', 'DELETE'])

    # def room_comment(request, room_id):
    #     # get a room comments list by room_id
    #     if request.method == 'GET':
    #         if not request.user.is_authenticated:
    #             return HttpResponse(status=401)
    #         room_comment_list = []
    #         for comment in Comment.objects.all():
    #             if(comment.section == 'room' and comment.room.id == room_id):
    #                 room_comment_list.append(
    #                     {
    #                         'id': comment.id,
    #                         'content': comment.content,
    #                         'articleId': room_id,
    #                         'authorId': comment.author.id
    #                     }
    #                 )
    #         return JsonResponse(room_comment_list, safe=False)

    #     else:
    #         return HttpResponseNotAllowed(['GET'])

def meeting_comment(request, meeting_id):
    # get a room comments list by meeting_id
    if request.method == 'GET':
        if not request.user.is_authenticated:
            return HttpResponse(status=401)
        meeting_comment_list = []
        for comment in Comment.objects.all():
            author_object = {
                'id': comment.author.id,
                'name': comment.author.name,
                'email': comment.author.email,
                'self_intro': comment.author.self_intro
            }
            if(comment.section == 'meeting' and comment.meeting.id == meeting_id):
                meeting_comment_list.append(
                    {
                        'id': comment.id,
                        'content': comment.content,
                        'articleId': meeting_id,
                        'author': author_object
                    }
                )
        return JsonResponse(meeting_comment_list, safe=False)

    else:
        return HttpResponseNotAllowed(['GET'])