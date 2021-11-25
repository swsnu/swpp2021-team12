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
            address = json.loads(body)['address']
            dates = json.loads(body)['dates']
        except (KeyError, JSONDecodeError):
            return HttpResponseBadRequest()
        room = Room.objects.create(title=title, description=description, capacity=capacity, host=user, address=address, dates=dates)
        room.save()
        response_dict = {'id':room.id, 'title': room.title, 'description': room.description, 'capacity': room.capacity, 'address': room.address, 'dates':room.dates}
        return JsonResponse(response_dict, status=201)
    else:
        return HttpResponseNotAllowed(['POST'])

def room(request, room_id):
    if request.method == 'GET':
        try:
            room = Room.objects.get(id=room_id)
        except (Room.DoesNotExist) as e:
            return HttpResponseNotFound()
        date_list = room.dates.strip('[]').split(', ')
        for i in range(len(date_list)):
            date_list[i] = date_list[i].strip('\'')
        response_dict = {'id':room.id, 'title': room.title, 'description': room.description, 'capacity': room.capacity, 'address': room.address, 'host_id': room.host.id, 'dates': date_list}
        return JsonResponse(response_dict)
    else:
        return HttpResponseNotAllowed(['GET'])

def host_room(request):
    user = request.user
    if request.method == 'GET':
        try:
            room = Room.objects.get(host_id=user.id)
        except (Room.DoesNotExist) as e:
            return HttpResponseNotFound()
        date_list = room.dates.strip('[]').split(', ')
        for i in range(len(date_list)):
            date_list[i] = date_list[i].strip('\'')
        response_dict = {'id':room.id, 'title': room.title, 'description': room.description, 'capacity': room.capacity, 'address': room.address, 'host_id': room.host.id, 'dates': date_list}
        return JsonResponse(response_dict)
    elif request.method == 'PUT':
        try:
            room = Room.objects.get(host_id=user.id)
            body = request.body.decode()
            title = json.loads(body)['title']
            description = json.loads(body)['description']
            capacity = json.loads(body)['capacity']
            address = json.loads(body)['address']
            dates = json.loads(body)['dates']
        except (Room.DoesNotExist):
            return HttpResponseNotFound()
        except (KeyError, JSONDecodeError):
            return HttpResponseBadRequest()
        room = Room(id=room.id, title=title, description=description, capacity=capacity, address=address, host=user, dates=dates)
        room.save()
        response_dict = {'id':room.id, 'title': room.title, 'description': room.description, 'capacity': room.capacity, 'address': room.address,'host_id': room.host.id}
        return JsonResponse(response_dict)
    elif request.method == 'DELETE':
        try:
            room = Room.objects.get(host_id=user.id)
        except (Room.DoesNotExist) as e:
            return HttpResponseNotFound()
        room.delete()
        return HttpResponse(status=200)
    else:
        return HttpResponseNotAllowed(['GET', 'PUT', 'DELETE'])
