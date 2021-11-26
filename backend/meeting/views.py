import json
from json.decoder import JSONDecodeError
from meeting.models import Meeting
from user.models import User, UserManager
from django.http import HttpResponse, HttpResponseNotAllowed, HttpResponseBadRequest, JsonResponse
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_exempt
from django.shortcuts import render

# TODO: access_scope, tag, location, photo
def meeting_(request):
    # get a whole meetings list
    if request.method == 'GET':
        if not request.user.is_authenticated:
            return HttpResponse(status=401)
        meeting_all_list = []
        for meeting in Meeting.objects.all():
            author_object = {
                'id': meeting.author.id,
                'name': meeting.author.name,
                'email': meeting.author.email,
                'self_intro': meeting.author.self_intro
            }
            member_list = []
            for member in meeting.current_members.all():
                member_object = {
                    'id': member.id,
                    'name': member.name,
                    'email': member.email,
                    'self_intro': member.self_intro
                }
                member_list.append(member_object)
            meeting_all_list.append(
                {
                    'id': meeting.id,
                    'title': meeting.title,
                    'content': meeting.content,
                    'author': author_object,
                    'maxMembers': meeting.max_members,
                    'currentMembers': member_list,
                    'location':{'position':{'lat':meeting.lat,'lng':meeting.lng}
                    ,'description':meeting.description},
                    'time':meeting.time,
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
            meeting_lat = req_data['lat']
            meeting_lng = req_data['lng']
            meeting_description = req_data['description']
            meeting_time = req_data['time']
        except (KeyError, JSONDecodeError) as error:
            return HttpResponseBadRequest(error)
        meeting = Meeting.objects.create(
            title=meeting_title,
            content=meeting_content,
            author=meeting_author,
            max_members=meeting_max_members,
            lat = meeting_lat,
            lng = meeting_lng,
            description = meeting_description,
            time = meeting_time,
        )
        meeting.current_members.add(meeting_author)
        meeting.save()
        member_list = []
        for member in meeting.current_members.all():
            member_list.append(member.id)
        response_dict = {
            'id': meeting.id,
        }
        return JsonResponse(response_dict, status=201)

    # wrong request
    else:
        return HttpResponseNotAllowed(['GET', 'POST'])


def specified_meeting(request, meeting_id):
    # get a specific meeting info
    if request.method == 'GET':
        if not request.user.is_authenticated:
            return HttpResponse(status=401)
        try:
            target_meeting = Meeting.objects.get(id=meeting_id)
        except Meeting.DoesNotExist:
            return HttpResponse(status=404)
        title = target_meeting.title
        content = target_meeting.content
        author = target_meeting.author
        author_object = {
            'id': author.id,
            'name': author.name,
            'email': author.email,
            'self_intro': author.self_intro
        }
        lat = target_meeting.lat
        lng = target_meeting.lng
        description = target_meeting.description
        time = target_meeting.time
        max_members = target_meeting.max_members
        member_list = []
        for member in target_meeting.current_members.all():
            member_object = {
                'id': member.id,
                'name': member.name,
                'email': member.email,
                'self_intro': member.self_intro
            }
            member_list.append(member_object)
        response_dict = {
            'id': meeting_id,
            'title': title,
            'content': content,
            'author': author_object,
            'maxMembers': max_members,
            'currentMembers': member_list,
            'location':{'position':{'lat':lat,'lng':lng}
            ,'description':description},
            'time':time,
        }
        return JsonResponse(response_dict)

    # edit the meeting
    elif request.method == 'PUT':
        if not request.user.is_authenticated:
            return HttpResponse(status=401)
        try:
            target_meeting = Meeting.objects.get(id=meeting_id)
        except Meeting.DoesNotExist:
            return HttpResponse(status=404)
        try:
            body = request.body.decode()
            req_data = json.loads(body)
            new_title = req_data['title']
            new_content = req_data['content']
            new_maxMembers = req_data['maxMembers']
            new_lat = req_data['lat']
            new_lng = req_data['lng']
            new_description = req_data['description']
            new_time = req_data['time']
        except (KeyError, JSONDecodeError) as error:
            return HttpResponseBadRequest(error)
        if target_meeting.author.id != request.user.id:
            return HttpResponse(status=403)
        else:
            target_meeting.title = new_title
            target_meeting.content = new_content
            target_meeting.max_members = new_maxMembers
            target_meeting.lat = new_lat
            target_meeting.lng = new_lng
            target_meeting.description = new_description
            target_meeting.time = new_time
            target_meeting.save()
            return HttpResponse(status=200)

    # delete the meeting
    elif request.method == 'DELETE':
        if not request.user.is_authenticated:
            return HttpResponse(status=401)
        try:
            target_meeting = Meeting.objects.get(id=meeting_id)
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

def meeting_photo(request,meeting_id=0):
    if request.method == 'GET':
        if request.user.is_authenticated:
            try:
                target_meeting = Meeting.objects.get(id=meeting_id)
                image = target_meeting.photo
                return HttpResponse(image,content_type="image/jpeg")
            except ValueError:
                return HttpResponse(status=404)
        else:
            return HttpResponse(status=401)
    elif request.method == 'POST':
        if request.user.is_authenticated:
            try:
                target_meeting = Meeting.objects.get(id=meeting_id)
                img = request.FILES['photo']
                target_meeting.photo.delete()
                target_meeting.photo = img
                target_meeting.save()
                return HttpResponse(status=200)
            except KeyError as error:
                return HttpResponseBadRequest(error)
        else:
            return HttpResponse(status=401)
    elif request.method == 'DELETE':
        if request.user.is_authenticated:
            target_meeting = Meeting.objects.get(id=meeting_id)
            target_meeting.photo.delete()
            return HttpResponse(status=200)
        else:
            return HttpResponse(status=401)
    else:
        return HttpResponseNotAllowed(['GET','POST','DELETE'])

def toggle_meeting(request, meeting_id):
    # join or quit meeting
    if request.method == 'PUT':
        if not request.user.is_authenticated:
            return HttpResponse(status=401)
        try:
            target_meeting = Meeting.objects.get(id=meeting_id)
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
        return  HttpResponse(status=200)
    
    else:
        return HttpResponseNotAllowed(['PUT'])


def joined_meeting(request):
    # get a meetings list by an author
    if request.method == 'GET':
        if not request.user.is_authenticated:
            return HttpResponse(status=401)
        meeting_all_list = []
        for meeting in Meeting.objects.all():
            if request.user in meeting.current_members.all():
                author_object = {
                    'id': meeting.author.id,
                    'name': meeting.author.name,
                    'email': meeting.author.email,
                    'self_intro': meeting.author.self_intro
                }
                member_list = []
                for member in meeting.current_members.all():
                    member_object = {
                        'id': member.id,
                        'name': member.name,
                        'email': member.email,
                        'self_intro': member.self_intro
                    }
                    member_list.append(member_object)
                meeting_all_list.append(
                    {
                        'id': meeting.id,
                        'title': meeting.title,
                        'content': meeting.content,
                        'author': author_object,
                        'maxMembers': meeting.max_members,
                        'currentMembers': member_list
                    }
                )
        return JsonResponse(meeting_all_list, safe=False)

    # wrong request
    else:
        return HttpResponseNotAllowed(['GET'])