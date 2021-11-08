from django.conf.urls import url
from user import views

urlpatterns = [
    url('sign_up/', views.signup),
    url('sign_in/', views.signin),
    url('sign_out/', views.signout),
    url('check_signin/',views.checksignin),
    url('token/', views.token),
]
