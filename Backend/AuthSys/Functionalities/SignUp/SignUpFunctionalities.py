from django.contrib.auth.models import User
from django.contrib.auth.models import UserManager
from django import forms
from django.contrib.auth import get_user_model

def check_if_email_already_exists(email):
    if User.objects.filter(email__iexact=email).exists():
        raise forms.ValidationError("User with this email already exists")

def sign_up_logic(username, email, password):
    check_if_email_already_exists(email=email)
    try:
        User.objects.create_user(username=username, email=email, password=password)
    except:
        raise forms.ValidationError("Issue while signing up")