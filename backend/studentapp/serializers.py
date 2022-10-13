from rest_framework import serializers
from studentapp.models import Student

class StudentSerializer(serializers.ModelSerializer):
    from lectureapp.serializers import SimpleLectureSerializer
    lectures = SimpleLectureSerializer(many=True, read_only=True)
    class Meta:
        model = Student
        fields = "__all__"

class SimpleStudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ('id','name','school','phone_number','phone_number_P')