import json
from json import JSONDecodeError
from .models import User
from django.http import HttpResponse, HttpResponseNotAllowed, HttpResponseBadRequest, JsonResponse
from django.contrib.auth import login, authenticate, logout
from django.views.decorators.csrf import ensure_csrf_cookie
from django.db.utils import IntegrityError
from django.views.decorators.csrf import csrf_exempt

# Create your views here.


def signin(request):
    if request.method == 'POST':
        try:
            req_data = json.loads(request.body.decode())
            email = req_data['email']
            password = req_data['password']
        except (KeyError, JSONDecodeError) as error:
            return HttpResponseBadRequest(error)
        user = authenticate(email=email, password=password)
        if user is None:
            return HttpResponse(status=401)
        login(request, user)
        u = User.objects.get(email=email)
        name = u.name
        userId = u.id
        return JsonResponse({"name":name, "id":userId},status=200,safe=False)
    return HttpResponseNotAllowed(['POST'])


def signup(request):
    if request.method == 'POST':
        try:
            req_data = json.loads(request.body.decode())
            password = req_data['password']
            name = req_data['name']
            email = req_data['email']
        except (KeyError, JSONDecodeError) as error:
            return HttpResponseBadRequest(error)
        try:
            User.objects.create_user(
                name=name, password=password, email=email)
            user = authenticate(email=email,password=password)
            login(request,user)
            u = User.objects.get(email=email)
            userId = u.id
        except IntegrityError:
            return HttpResponse(status=409)
        return JsonResponse({"name":name, "id":userId},status=200,safe=False)
    else:
        return HttpResponseNotAllowed(['POST'])


def signout(request):
    if request.method == 'GET':
        if request.user.is_authenticated:
            logout(request)
            return HttpResponse(status=204)
        return HttpResponse(status=401)
    else:
        return HttpResponseNotAllowed(['GET'])


@ensure_csrf_cookie
def token(request):
    if request.method == 'GET':
        return HttpResponse(status=204)
    else:
        return HttpResponse(status=405)
