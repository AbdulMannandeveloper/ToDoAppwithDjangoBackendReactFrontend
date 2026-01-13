from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status


from .Functionalities.Login.LoginFunctionalities import login_logic
from .Functionalities.SignUp.SignUpFunctionalities import sign_up_logic
from .Functionalities.ChangePassword.ChangePassword import change_password_logic
from Serializers import SignUpSerializer, LoginSerializer, ChangePasswordSerializer

@api_view(['POST'])
@permission_classes([AllowAny])
def login(request):
    serializer = LoginSerializer(data=request.data)

    if not serializer.is_valid():
        return Response(serializer.errors, status=400)

    username = serializer.validated_data['username']
    password = serializer.validated_data['password']

    try:
        tokens = login_logic(request, username, password)
        return Response({'message': 'Success', 'tokens': tokens}, status=200)
    except Exception as e:
        return Response({'error': str(e)}, status=401)


@api_view(['POST'])
@permission_classes([AllowAny])
def sign_up(request):
    serializer = SignUpSerializer(data = request.data)

    if not serializer.is_valid():
        return Response(serializer.errors, status=400)
    
    username = serializer.validated_data['username']
    email = serializer.validated_data['email']
    password = serializer.validated_data['password']

    try:
        sign_up_logic(username, email, password)
        return Response({'message': 'User Created Successfully'}, status=201)
    except Exception as e:
        return Response({'error': str(e)}, status=400)



@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def change_password(request):
    serializer = ChangePasswordSerializer(data = request.data)

    if not serializer.is_valid():
        return Response(serializer.errors, status=400)
    
    username = serializer.validated_data['username']
    old_password = serializer.validated_data['old_password']
    new_password = serializer.validated_data['new_password']

    try:
        change_password_logic(request, username=username, old_password= old_password, new_password= new_password)
        return Response({'message': 'Password Updated'}, status=200)
    except Exception as e:
        return Response({'error': str(e)}, status=400)