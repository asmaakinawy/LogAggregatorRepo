from rest_framework.serializers import ModelSerializer
from .models import User


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['email', 'username', 'password', 'api_key']
        extra_kwargs = {'password': {'write_only': True}, 'api_key': {'read_only': True}}


    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User.objects.create(**validated_data)
        user.set_password(password)
        user.save()
        return user
