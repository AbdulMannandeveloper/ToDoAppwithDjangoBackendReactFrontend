from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.exceptions import AuthenticationFailed

def login_logic(request, username, password):
    user = authenticate(request, username=username, password=password)

    if user is not None:
        if not user.is_active:
             raise AuthenticationFailed("User account is disabled")

        token_data = RefreshToken.for_user(user)

        return {
            'user_id': user.id,
            'username': user.username,
            'email': user.email, 
            
            'refresh': str(token_data),
            'access': str(token_data.access_token),
        }
    else:
        raise AuthenticationFailed("Invalid Username or Password")