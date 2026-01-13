from rest_framework import serializers

class TaskSerializer(serializers.Serializer):
    task_id = serializers.IntegerField()
    task = serializers.CharField(max_length = 500)
    is_done = serializers.BooleanField()