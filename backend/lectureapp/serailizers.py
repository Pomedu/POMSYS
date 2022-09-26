from rest_framework import serializers

from lectureapp.models import Lecture, Lesson, CourseRegistration, Test, TestRecord, Video, VideoWatchRecord, Attendance
from teacherapp.models import Teacher

class LectureSerializer(serializers.ModelSerializer):
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