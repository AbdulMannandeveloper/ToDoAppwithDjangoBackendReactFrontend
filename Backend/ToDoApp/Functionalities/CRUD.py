from ToDoApp.models import Tasks
from django.contrib.auth.models import User
import json
from django.http import JsonResponse
from django import forms
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from ..Serializers import TaskSerializer
from rest_framework import status


def create(request):
    serializer = TaskSerializer(data=request.data)
    print("test one")
    if serializer.is_valid():
        print('asd')
        serializer.save(user=request.user) 
        print("test two")
        return Response({'message': 'Task Created'}, status=status.HTTP_201_CREATED)
    print(serializer)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


def read(request):
    results = Tasks.objects.filter(user = request.user)
    results = TaskSerializer(results, many = True)
    return Response(results.data)


def update(request):
    task_id = request.data.get('task_id')
    try:
        result = Tasks.objects.get(task_id = task_id, user = request.user)


    except Tasks.DoesNotExist:
        return Response({'Response':'Data does not exist'}, status=status.HTTP_404_NOT_FOUND)
    

    serializer = TaskSerializer(result, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response({'Response' : 'Task Updated Successfully'}, status=status.HTTP_201_CREATED)
    

    else:
        return Response({'Response':'Something went wrong'}, status=status.HTTP_400_BAD_REQUEST)
    

def delete(request):
    task = request.data.get('task_id')
    try:
        result = Tasks.objects.get(task_id = task, user = request.user)

    except Tasks.DoesNotExist:
        return Response({'Response':'Data does not exist'}, status=status.HTTP_404_NOT_FOUND)

    result.delete()

    return Response({'message' : 'Task Deleted Successfully'}, status=status.HTTP_200_OK)
    