from rest_framework import serializers
from studentapp.models import Student
from lectureapp.serailizers import SimpleLectureSerializer

class StudentSerializer(serializers.ModelSerializer):
    lectures = SimpleLectureSerializer(many=True, read_only=True)
    class Meta:
        model = Student
        fields = "__all__"