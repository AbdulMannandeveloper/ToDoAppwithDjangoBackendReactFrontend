from rest_framework import serializers

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField(max_length = 250)
    password = serializers.CharField(max_length = 250)

class SignUpSerializer(serializers.Serializer):
    username = serializers.CharField(max_length = 250)
    email = serializers.CharField(max_length = 250)
    password = serializers.CharField(max_length = 250)
    

class ChangePasswordSerializer(serializers.Serializer):
    username = serializers.CharField(max_length = 250)
    old_password = serializers.CharField(max_length = 250)
    new_password = serializers.CharField(max_length = 250)
