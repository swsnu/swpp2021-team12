from json.decoder import JSONDecodeError
from django.shortcuts import render
from django.http import HttpResponse, HttpResponseBadRequest, HttpResponseNotAllowed, HttpResponseNotFound, JsonResponse
import json
from .models import Room, Date, RoomRequest
from user.models import User
# Create your views here.

# Register new Room
def register_room(request):
    if request.method == 'GET':
        room_list = [room for room in Room.objects.all().values()]
        return JsonResponse(room_list, safe=False)

    if request.method == 'POST':
        user = request.user
        # Json data load from request
        try:
            body = request.body.decode()
            title = json.loads(body)['title']
            description = json.loads(body)['description']
            capacity = json.loads(body)['capacity']
            address = json.loads(body)['address']
            dates = json.loads(body)['dates']
            lat = json.loads(body)['lat']
            lng = json.loads(body)['lng']

        except (KeyError, JSONDecodeError):
            return HttpResponseBadRequest()

        # Make Room Object
        room = Room.objects.create(title=title, description=description, capacity=capacity, host=user, address=address, dates=dates, lat=lat, lng=lng)
        room.save()

        # Make Date Objects related to Room
        for date in dates:
            year = date[0:4]
            month = date[5:7]
            day = date[8:10]
            new_date = Date.objects.create(date=date, room=room, current_mem_num=0, year=year, month=month, day=day)
            new_date.save()
        return HttpResponse(status=201)
    else:
        return HttpResponseNotAllowed(['GET', 'POST'])

# Get an user's room data
def room(request, room_id):
    if request.method == 'GET':
        try:
            room = Room.objects.select_related('host').get(id=room_id)
            user = User.objects.get(id=room.host.id)
        except (Room.DoesNotExist) as e:
            return HttpResponseNotFound()
        date_list = list(room.date.all().values('date', 'current_mem_num'))
        # response.data = {
        # id: int, title: string, description: string, capacity: int, address: string, host_id: int, 
        # dates: [{ date: string, current_mem_num: int }, ]}
        user_dict = {
            'id': user.id,
            'name': user.name,
            'email': user.email,
            'self_intro': user.self_intro,            
        }
        response_dict = {
            'id':room.id,
            'title': room.title,
            'description': room.description,
            'capacity': room.capacity,
            'address': room.address,
            'host_id': room.host.id,
            'user': user_dict,
            'lat':room.lat,
            'lng':room.lng,
            'dates': date_list,
        }
        return JsonResponse(response_dict)
    else:
        return HttpResponseNotAllowed(['GET'])

# Methods about logged in user's room
def host_room(request):
    user = request.user
    if request.method == 'GET':
        try:
            room = Room.objects.get(host_id=user.id)
        except (Room.DoesNotExist) as e:
            return HttpResponseNotFound()
        date_list = list(room.date.all().values('date', 'current_mem_num'))
        pending_list = []
        for request in RoomRequest.objects.all():
            if(request.request_date.room.id == room.id):
                pending = {
                    'id': request.id,
                    'requester': {
                        'id': request.requester.id,
                        'name': request.requester.name,
                        'email': request.requester.email,
                        'self_intro': request.requester.self_intro
                    },
                    'content': request.content,
                    'date': request.request_date.date
                }
                pending_list.append(pending)
        # response.data = {
        # id: int, title: string, description: string, capacity: int, address: string, host_id: int, 
        # dates: [{ date: string, current_mem_num: int }, ],
        # pendings: [{
        #   requester: { id: int, name: string, email: string, self_intro: string }
        #   content: string,
        #   date: string }, ]}
        response_dict = {
            'id':room.id,
            'title': room.title,
            'description': room.description,
            'capacity': room.capacity,
            'address': room.address,
            'host_id': room.host.id,
            'lat':room.lat,
            'lng':room.lng,
            'dates': date_list,
            'pendings': pending_list
        }
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
            lat = json.loads(body)['lat']
            lng = json.loads(body)['lng']
        except (Room.DoesNotExist):
            return HttpResponseNotFound()
        except (KeyError, JSONDecodeError):
            return HttpResponseBadRequest()
        # Delete old dates not in request
        old_date_list = room.date.all()
        for old_date in old_date_list:
            if old_date.date not in dates:
                old_date.delete()
        old_date_list = list(old_date_list.values_list('date', flat=True))
        # Create new dates not in old date
        for new_date in dates:
            if new_date not in old_date_list:
                year = new_date[0:4]
                month = new_date[5:7]
                day = new_date[8:10]
                date = Date.objects.create(date=new_date, room=room, current_mem_num=0, year=year, month=month, day=day)
                date.save()

        room = Room(id=room.id, title=title, description=description, capacity=capacity, address=address, host=user, dates=dates, lat=lat, lng=lng)
        room.save()
        return HttpResponse(status=200)

    elif request.method == 'DELETE':
        try:
            room = Room.objects.get(host_id=user.id)
        except (Room.DoesNotExist) as e:
            return HttpResponseNotFound()
        room.delete()
        return HttpResponse(status=200)

    else:
        return HttpResponseNotAllowed(['GET', 'PUT', 'DELETE'])

def create_pending(request, room_id):
    user = request.user
    # create a pending request
    if request.method == 'POST':
        try:
            room = Room.objects.get(id=room_id)
            body = request.body.decode()
            date = json.loads(body)['date']
        except (Room.DoesNotExist) as e:
            return HttpResponseNotFound()
        except (KeyError, JSONDecodeError):
            return HttpResponseBadRequest()
        year = date[0:4]
        month = date[4:6]
        day = date[6:8]
        date_object = room.date.get(year=year, month=month, day=day)
        # date_object = Date.objects.get(year=year, month=month, day=day, room=room)
        request =  RoomRequest(requester=user, content='Hello!', request_date=date_object)
        request.save()
        return HttpResponse(status=201)

    else:
        return HttpResponseNotAllowed(['POST'])

def handle_pending(request):
    user = request.user
    if request.method == 'PUT':
        try:
            room = Room.objects.get(host_id=user.id)
            body = request.body.decode()
            pending_id = json.loads(body)['pending_id']
            pending_request = RoomRequest.objects.get(id=pending_id)
            accept_or_refuse = json.loads(body)['accept_or_refuse']
        except (Room.DoesNotExist):
            return HttpResponseNotFound()
        except (RoomRequest.DoesNotExist):
            return HttpResponseNotFound()
        except (KeyError, JSONDecodeError):
            return HttpResponseBadRequest()

        # accept
        date = pending_request.request_date
        available_capacity = room.capacity - date.current_mem_num
        if accept_or_refuse == 1 and available_capacity > 0:
            date.current_mem_num += 1
            date.save()
        pending_request.delete()
        return HttpResponse(status=200)
    
    else:
        return HttpResponseNotAllowed(['PUT'])

def user_room(request, user_id):
    if request.method == 'GET':
        try:
            room = Room.objects.get(host__id=user_id)
        except (Room.DoesNotExist):
            return HttpResponseNotFound()
        date_list = list(room.date.all().values('date', 'current_mem_num'))
        response_dict = {'id':room.id, 'title': room.title, 'description': room.description, 'capacity': room.capacity, 'address': room.address, 'host_id': room.host.id,'lat':room.lat, 'lng':room.lng, 'dates': date_list}
        return JsonResponse(response_dict)
