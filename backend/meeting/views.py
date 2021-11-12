import json
from json.decoder import JSONDecodeError
from django.shortcuts import render
from meeting.models import Meeting
from user.models import User, UserManager
from django.http import HttpResponse, HttpResponseNotAllowed, HttpResponseBadRequest, JsonResponse
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_exempt

# TODO: access_scope, tag, location, photo
def meeting(request):
    # get a whole meetings list
    if request.method == 'GET':
        if not request.user.is_authenticated:
            return HttpResponse(status=401)
        meeting_all_list = []
        for meeting in Meeting.objects.all():
            member_list = []
            for member in meeting.current_members.all():
                member_list.append(member.id)
            meeting_all_list.append(
                {
                    'id': meeting.id,
                    'title': meeting.title,
                    'content': meeting.content,
                    'authorId': meeting.author.id,
                    'maxMembers': meeting.max_members,
                    'currentMembers': member_list
                }
            )
        return JsonResponse(meeting_all_list, safe=False)

    # create a new meeting
    elif request.method == 'POST':
        if not request.user.is_authenticated:
            return HttpResponse(status=401)
        try:
            body = request.body.decode()
            req_data =  json.loads(body)
            meeting_title = req_data['title']
            meeting_content = req_data['content']
            meeting_author = request.user
            meeting_max_members = req_data['maxMembers']
        except (KeyError, JSONDecodeError) as error:
            return HttpResponseBadRequest(error)
        meeting = Meeting.objects.create(
            title=meeting_title,
            content=meeting_content,
            author=meeting_author,
            max_members=meeting_max_members
        )
        meeting.current_members.add(meeting_author)
        meeting.save()
        member_list = []
        for member in meeting.current_members.all():
            member_list.append(member.id)
        response_dict = {
            'id': meeting.id,
            'title': meeting.title,
            'content': meeting.content,
            'authorId': meeting.author.id,
            'maxMembers': meeting.max_members,
            'currentMembers': member_list
        }
        return JsonResponse(response_dict, status=201)

    # wrong request
    else:
        return HttpResponseNotAllowed(['GET', 'POST'])


def specified_meeting(request, id):
    # get a specific meeting info
    if request.method == 'GET':
        if not request.user.is_authenticated:
            return HttpResponse(status=401)
        try:
            target_meeting = Meeting.objects.get(id=id)
        except Meeting.DoesNotExist:
            return HttpResponse(status=404)
        title = target_meeting.title
        content = target_meeting.content
        author = target_meeting.author
        max_members = target_meeting.max_members
        member_list = []
        for member in target_meeting.current_members.all():
            member_list.append(member.id)
        response_dict = {
            'title': title,
            'content': content,
            'authorId': author.id,
            'maxMembers': max_members,
            'currentMembers': member_list
        }
        return JsonResponse(response_dict)

    # edit the meeting
    elif request.method == 'PUT':
        if not request.user.is_authenticated:
            return HttpResponse(status=401)
        try:
            target_meeting = Meeting.objects.get(id=id)
        except Meeting.DoesNotExist:
            return HttpResponse(status=404)
        try:
            body = request.body.decode()
            req_data = json.loads(body)
            new_title = req_data['title']
            new_content = req_data['content']
            new_maxMembers = req_data['maxMembers']
        except (KeyError, JSONDecodeError) as error:
            return HttpResponseBadRequest(error)
        if target_meeting.author.id != request.user.id:
            return HttpResponse(status=403)
        else:
            target_meeting.title = new_title
            target_meeting.content = new_content
            target_meeting.max_members = new_maxMembers
            target_meeting.save()
            member_list = []
            for member in target_meeting.current_memmbers.all():
                member_list.append(member.id)
            response_dict = {
                'id': target_meeting.id,
                'title': target_meeting.title,
                'content': target_meeting.content,
                'authorId': target_meeting.author.id,
                'maxMembers': target_meeting.max_members,
                'currentMembers': member_list
            }
            return  JsonResponse(response_dict, status=200)

    # delete the meeting
    elif request.method == 'DELETE':
        if not request.user.is_authenticated:
            return HttpResponse(status=401)
        try:
            target_meeting = Meeting.objects.get(id=id)
        except Meeting.DoesNotExist:
            return HttpResponse(status=404)
        if target_meeting.author.id != request.user.id:
            return HttpResponse(status=403)
        else:
            target_meeting.delete()
            return HttpResponse(status=200)

    # wrong request
    else:
        return HttpResponseNotAllowed(['GET', 'PUT', 'DELETE'])

def toggle_meeting(request, id):
    # join or quit meeting
    if request.method == 'PUT':
        if not request.user.is_authenticated:
            return HttpResponse(status=401)
        try:
            target_meeting = Meeting.objects.get(id=id)
        except Meeting.DoesNotExist:
            return HttpResponse(status=404)
        try:
            body = request.body.decode()
            req_data = json.loads(body)
            join_or_quit = req_data['joinOrQuit']
        except (KeyError, JSONDecodeError) as error:
            return HttpResponseBadRequest(error)

        request_user = User.objects.get(id=request.user.id)
        # join
        if join_or_quit == 1:
            target_meeting.current_members.add(request_user)
        # quit
        else:
            target_meeting.current_members.remove(request_user)
        target_meeting.save()
        member_list = []
        for member in target_meeting.current_members.all():
            member_list.append(member.id)
        response_dict = {
            'id': target_meeting.id,
            'title': target_meeting.title,
            'content': target_meeting.content,
            'authorId': target_meeting.author.id,
            'maxMembers': target_meeting.max_members,
            'currentMembers': member_list
        }
        return  JsonResponse(response_dict, status=200)
    
    else:
        return HttpResponseNotAllowed(['PUT'])


def meeting_by_author(request, author_id):
    # get a meetings list by an author
    if request.method == 'GET':
        if not request.user.is_authenticated:
            return HttpResponse(status=401)
        meeting_all_list = []
        for meeting in Meeting.objects.all():
            if meeting.author.id == author_id:
                member_list = []
                for member in meeting.current_members.all():
                    member_list.append(member.id)
                meeting_all_list.append(
                    {
                        'title': meeting.title,
                        'content': meeting.content,
                        'authorId': meeting.author.id,
                        'maxMembers': meeting.max_members,
                        'currentMembers': member_list
                    }
                )
        return JsonResponse(meeting_all_list, safe=False)

    # wrong request
    else:
        return HttpResponseNotAllowed(['GET'])