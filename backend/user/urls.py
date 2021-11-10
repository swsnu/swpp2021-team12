from django.conf.urls import url
from django.urls import path
from user import views

urlpatterns = [
    path('sign_up/', views.signup),
    path('sign_in/', views.signin),
    path('sign_out/', views.signout),
    path('check_signin/',views.checksignin),
    path('<int:user_id>/',views.user_deatil),
    path('<int:user_id>/profile/',views.user_profile),
    path('token/', views.token),
]
