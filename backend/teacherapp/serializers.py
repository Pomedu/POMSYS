from rest_framework import serializers
from teacherapp.models import Teacher

class TeacherSerializer(serializers.ModelSerializer):
    from lectureapp.serializers import SimpleLectureSerializer
    lectures = SimpleLectureSerializer(many=True, read_only=True)
    subject = serializers.CharField(source='get_subject_display')
    class Meta:
        model = Teacher
        fields = "__all__"

class TeacherCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Teacher
        fields = "__all__"