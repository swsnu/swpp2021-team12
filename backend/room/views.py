from json.decoder import JSONDecodeError
from django.shortcuts import render
from django.http import HttpResponse, HttpResponseBadRequest, HttpResponseNotAllowed, HttpResponseForbidden, HttpResponseNotFound, JsonResponse
import json
from .models import Room
# Create your views here.

def register_room(request):
    if request.method == 'POST':
        user = request.user
        try:
            body = request.body.decode()
            title = json.loads(body)['title']
            description = json.loads(body)['description']
            capacity = json.loads(body)['capacity']
        except (KeyError, JSONDecodeError):
            return HttpResponseBadRequest()
        room = Room.objects.create(title=title, description=description, capacity=capacity, host=user)
        room.save()
        response_dict = {'title': room.title, 'description': room.description, 'capacity': room.capacity, 'host': room.host}
        return JsonResponse(response_dict, status=201)
    else:
        return HttpResponseNotAllowed(['POST'])

def room(request, id):
    if request.method == 'GET':
        try:
            room = Room.objects.get(id=id)
        except (Room.DoesNotExist) as e:
            return HttpResponseNotFound()
        response_dict = {'title': room.title, 'description': room.description, 'capacity': room.capacity, 'host_id': room.host.id}
        return JsonResponse(response_dict)
    else:
        return HttpResponseNotAllowed(['GET'])

def host_room(request, host_id):
    if request.method == 'GET':
        
        return
    elif request.method == 'PUT':

        return
    elif request.method == 'DELETE':

        return
    else:
        return HttpResponseNotAllowed(['GET', 'PUT', 'DELETE'])
