from rest_framework import serializers
from teacherapp.models import Teacher
from lectureapp.serailizers import SimpleLectureSerializer

class TeacherSerializer(serializers.ModelSerializer):
    lectures = SimpleLectureSerializer(many=True, read_only=True)
    subject = serializers.CharField(source='get_subject_display')
    class Meta:
        model = Teacher
        fields = "__all__"

class TeacherCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Teacher
        fields = "__all__"