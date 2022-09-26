from rest_framework import serializers
from teacherapp.models import Teacher

class TeacherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Teacher
        fields = "__all__"