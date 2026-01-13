from django.contrib.auth.models import User
from django.contrib.auth import authenticate, update_session_auth_hash
from django.forms import ValidationError
from django.contrib.auth.password_validation import validate_password # <--- IMPORTANT

def change_password_logic(request, username, old_password, new_password):
    user = authenticate(request, username=username, password = old_password)

    if user is None:
        raise ValidationError("User Does no exist")
    try:
        validate_password(new_password, user)
    except Exception as e:
        raise ValidationError(e)
    user.set_password(new_password)
    user.save()

    return True