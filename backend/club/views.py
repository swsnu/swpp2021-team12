import json
from json.decoder import JSONDecodeError
from club.models import Club
from user.models import User, UserManager
from django.http import HttpResponse, HttpResponseNotAllowed, HttpResponseBadRequest, JsonResponse
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_exempt
from django.shortcuts import render

def club_(request):
    # get a whole clubs list
    if request.method == 'GET':
        if not request.user.is_authenticated:
            return HttpResponse(status=401)
        club_all_list = []
        for club in Club.objects.all():
            author_object = {
                'id': club.author.id,
                'name': club.author.name,
                'email': club.author.email,
                'self_intro': club.author.self_intro
            }
            member_list = []
            for member in club.members.all():
                member_object = {
                    'id': member.id,
                    'name': member.name,
                    'email': member.email,
                    'self_intro': member.self_intro
                }
                member_list.append(member_object)
            pending_list = []
            for pending_member in club.pending_members.all():
                pending = {
                    'id': pending_member.id,
                    'name': pending_member.name,
                    'email': pending_member.email,
                    'self_intro': pending_member.self_intro
                }
                pending_list.append(pending)
            club_all_list.append(
                {
                    'id': club.id,
                    'title': club.title,
                    'content': club.content,
                    'author': author_object,
                    'members': member_list,
                    'pendings': pending_list
                }
            )
        return JsonResponse(club_all_list, safe=False)

    # create a new club
    elif request.method == 'POST':
        if not request.user.is_authenticated:
            return HttpResponse(status=401)
        try:
            body = request.body.decode()
            req_data = json.loads(body)
            club_title = req_data['title']
            club_content = req_data['content']
            club_author = request.user
        except (KeyError, JSONDecodeError) as error:
            return HttpResponseBadRequest(error)
        club = Club.objects.create(
            title=club_title,
            content=club_content,
            author=club_author
        )
        club.save()
        return HttpResponse(status=201)

    # wrong request
    else:
        return HttpResponseNotAllowed(['GET', 'POST'])

def specified_club(request, club_id):
    # edit the club
    if request.method == 'PUT':
        if not request.user.is_authenticated:
            return HttpResponse(status=401)
        try:
            target_club = Club.objects.get(id=club_id)
        except Club.DoesNotExist:
            return HttpResponse(status=404)
        try:
            body = request.body.decode()
            req_data = json.loads(body)
            new_title = req_data['title']
            new_content = req_data['content']
            kick_members = req_data['kick_members']
        except (KeyError, JSONDecodeError) as error:
            return HttpResponseBadRequest(error)
        if target_club.author.id != request.user.id:
            return HttpResponse(status=403)
        else:
            target_club.title = new_title
            target_club.content = new_content
            for member in kick_members:
                target_member = User.objects.get(id=member)
                target_club.members.remove(target_member)
            target_club.save()
            return HttpResponse(status=200)

    # delete the club
    elif request.method == 'DELETE':
        if not request.user.is_authenticated:
            return HttpResponse(status=401)
        try:
            target_club = Club.objects.get(id=club_id)
        except Club.DoesNotExist:
            return HttpResponse(status=404)
        if target_club.author.id != request.user.id:
            return HttpResponse(status=403)
        else:
            target_club.delete()
            return HttpResponse(status=200)

    # wrong request
    else:
        return HttpResponseNotAllowed(['PUT', 'DELETE'])

def toggle_club(request, club_id):
    # join or quit club
    if request.method == 'PUT':
        if not request.user.is_authenticated:
            return HttpResponse(status=401)
        try:
            target_club = Club.objects.get(id=club_id)
        except Club.DoesNotExist:
            return HttpResponse(status=404)
        try:
            body  = request.body.decode()
            req_data = json.loads(body)
            join_or_quit = req_data['join_or_quit']
        except (KeyError, JSONDecodeError) as error:
            return HttpResponseBadRequest(error)
        
        request_user = User.objects.get(id=request.user.id)
        # join
        if join_or_quit == 1:
            target_club.pending_members.add(request_user)
        # quit
        else:
            target_club.members.remove(request_user)
        target_club.save()
        return HttpResponse(status=200)

    else:
        return HttpResponseNotAllowed(['PUT'])

def handle_pending(request, club_id):
    # get all pendings
    if request.method == 'GET':
        if not request.user.is_authenticated:
            return HttpResponse(status=401)
        try:
            target_club = Club.objects.get(id=club_id)
        except Club.DoesNotExist:
            return HttpResponse(status=404)

        pending_list = []
        for pending_member in target_club.pending_members.all():
            pending = {
                'id': pending_member.id,
                'name': pending_member.name,
                'email': pending_member.email,
                'self_intro': pending_member.self_intro
            }
            pending_list.append(pending)
        return JsonResponse(pending_list, safe=False)

    # accept or refuse pending
    elif request.method == 'PUT':
        if not request.user.is_authenticated:
            return HttpResponse(status=401)
        try:
            target_club = Club.objects.get(id=club_id)
        except Club.DoesNotExist:
            return HttpResponse(status=404)
        try:
            body  = request.body.decode()
            req_data = json.loads(body)
            pending_id = req_data['pending_id']
            accept_or_refuse = req_data['accept_or_refuse']
        except (KeyError, JSONDecodeError) as error:
            return HttpResponseBadRequest(error)

        request_user = User.objects.get(id=pending_id)
        # accept
        if accept_or_refuse == 1:
            target_club.members.add(request_user)
        target_club.pending_members.remove(request_user)
        target_club.save()
        return HttpResponse(status=200)
    
    else:
        return HttpResponseNotAllowed(['GET', 'PUT'])