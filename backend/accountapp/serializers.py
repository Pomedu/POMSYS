from rest_framework import serializers
from django.contrib.auth import get_user_model, authenticate
from dj_rest_auth.registration.serializers import RegisterSerializer 
from dj_rest_auth.serializers import LoginSerializer, UserDetailsSerializer
from rest_framework.validators import UniqueValidator
from accountapp.models import User

class CustomRegisterSerializer(RegisterSerializer):
    username = None
    email = None
    phone_number = serializers.CharField(
        max_length=11, 
        validators=[UniqueValidator(queryset=User.objects.all(),message="중복되는 번호가 존재합니다")],
        )
    name  = serializers.CharField(max_length=10)
    role = serializers.CharField(max_length=1)
    class Meta:
        model = get_user_model()
        fields = [
            "phone_number",
            "password",
            "name",
            "role"
        ]

    def get_cleaned_data(self):
        super(CustomRegisterSerializer, self).get_cleaned_data()
        return {
            'name': self.validated_data.get('name', ''),
            'role': self.validated_data.get('role', ''),
            'password1': self.validated_data.get('password1', ''),
            'password2': self.validated_data.get('password2', ''),
            'phone_number': self.validated_data.get('phone_number', ''),
        }


class CustomLoginSerializer(LoginSerializer):
    phone_number = serializers.CharField(max_length=11)
    username = None
    email = None

    def authenticate(self, **options):
        return authenticate(self.context["request"], **options)

    def validate(self, attrs):
        phone_number = attrs.get("phone_number")
        password = attrs.get("password")
        if phone_number and password:
            user = authenticate(               
                phone_number=phone_number,
                password=password,
            )
            if not user:
                msg = "계정정보가 존재하지 않습니다."
                raise serializers.ValidationError(msg, code="authorization")
        else:
            msg = "아이디(번호)를 입력해주세요."
            raise exceptions.ValidationError(msg)
        attrs["user"] = user
        return attrs

class CustomUserDetailsSerializer(UserDetailsSerializer):

    class Meta(UserDetailsSerializer.Meta):
        fields = UserDetailsSerializer.Meta.fields + \
            ('role', 'is_admin', 'name')