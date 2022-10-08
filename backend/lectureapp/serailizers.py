from rest_framework import serializers

from lectureapp.models import Lecture, Lesson, CourseRegistration, Test, TestRecord, Video, VideoWatchRecord, Attendance
from teacherapp.models import Teacher

class LectureSerializer(serializers.ModelSerializer):
    teacher = serializers.StringRelatedField(many=False)
    status = serializers.CharField(source='get_status_display')
    students = serializers.StringRelatedField(many=True)
    class Meta:
        model = Lecture
        fields = "__all__"

class SimpleLectureSerializer(serializers.ModelSerializer):
    students = serializers.StringRelatedField(many=True)
    teacher = serializers.StringRelatedField(many=False)
    class Meta:
        model = Lecture
        fields = ('id','name','teacher','students')

class LectureCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lecture
        fields = "__all__"

class LessonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lesson
        fields = "__all__"
        read_only_fields = ('lecture',)

class CourseRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = CourseRegistration
        fields = "__all__"

class TestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Test
        fields = "__all__"

class TestRecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = TestRecord
        fields = "__all__"


class VideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Video
        fields = "__all__"

class VideoWatchRecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = VideoWatchRecord
        fields = "__all__"

class AttendanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attendance
        fields = "__all__"