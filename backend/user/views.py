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
        user_id = u.id
        return JsonResponse({"id":user_id},status=200,safe=False)
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
            user_id = u.id
        except IntegrityError:
            return HttpResponse(status=409)
        return JsonResponse({"id":user_id},status=201,safe=False)
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

def checksignin(request):
    if request.method == 'GET':
        if request.user.is_authenticated:
            return HttpResponse(status=200)
        return HttpResponse(status=401)
    else:
        return HttpResponseNotAllowed(['GET'])

def user_deatil(request,user_id=0):
    if request.method == 'GET':
        if request.user.is_authenticated:
            u = User.objects.get(id=user_id)
            user_name = u.name
            user_email = u.email
            user_intro = u.self_intro
            return JsonResponse({"name":user_name,"email":user_email,"selfIntro":user_intro}, status=200, safe=False)
        else:
            return HttpResponse(status=401)
    elif request.method == 'PUT':
        if request.user.is_authenticated:
            try:
                req_data = json.loads(request.body.decode())
                new_intro = req_data['self_intro']
                u = User.objects.get(id=user_id)
                u.self_intro = new_intro
                u.save()
                return HttpResponse(status=200)
            except (KeyError, JSONDecodeError) as error:
                return HttpResponseBadRequest(error)
        else:
            return HttpResponse(status=401)
    else:
        HttpResponseNotAllowed(['GET','PUT'])

def user_profile(request,user_id=0):
    if request.method == 'GET':
        if request.user.is_authenticated:
            try:
                u = User.objects.get(id=user_id)
                profile_image = u.profile_img
                return HttpResponse(profile_image,content_type="image/jpeg")
            except:
                return HttpResponse(status=404)
        else:
            return HttpResponse(status=401)
    elif request.method == 'POST':
        if request.user.is_authenticated:
            try:
                u = User.objects.get(id=user_id)
                img = request.FILES['profile']
                u.profile_img.delete()
                u.profile_img = img
                u.save()
                return HttpResponse(status=200)
            except KeyError as error:
                return HttpResponseBadRequest(error)
        else:
            return HttpResponse(status=401)
    elif request.method == 'DELETE':
        if request.user.is_authenticated:
            u = User.objects.get(id = user_id)
            u.profile_img.delete()
            return HttpResponse(status=200)
        else:
            return HttpResponse(status=401)
    else:
        return HttpResponseNotAllowed(['GET','POST'])
        
@ensure_csrf_cookie
def token(request):
    if request.method == 'GET':
        return HttpResponse(status=204)
    else:
        return HttpResponse(status=405)
