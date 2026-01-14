from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from .Functionalities.CRUD import create, update, read, delete
# Create your views here.

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_task(request):
    print('checking')
    return create(request= request)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def read_tasks(request):
    return read(request=request)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_task(request):
    return update(request)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_task(request):
    return delete(request)

