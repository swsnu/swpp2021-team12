import json
from json.decoder import JSONDecodeError
from django.shortcuts import render
from meeting.models import Meeting
from user.models import User, UserManager
from django.http import HttpResponse, HttpResponseNotAllowed, HttpResponseBadRRequest, JsonResponse
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_exempt

def meeting(request):
    # get a whole meetings list
    if request.methood == 'GET':

    # create a new meeting
    elif request.method == 'POST':

    # wrong request
    else:
        return HttpResponseNotAllowed(['GET', 'POST'])


def specified_meeting(request, id):
    # get a specific meeting info
    if request.method == 'GET':

    # edit the meeting
    elif request.method == 'PUT':

    # delete the meeting
    elif request.method == 'DELETE':

    # wrong request
    else:
        return HttpResponseNotAllowed(['GET', 'PUT', 'DELETE'])

def meeting_by_author(request, author_id):
    # get a meetings list by an author
    if request.method == 'GET':

    # wrong request
    else:
        return HttpResponseNotAllowed(['GET'])