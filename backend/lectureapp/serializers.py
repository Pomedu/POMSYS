from rest_framework import serializers

from lectureapp.models import *
from teacherapp.models import Teacher

class LectureSerializer(serializers.ModelSerializer):
    teacher = serializers.StringRelatedField(many=False)
    status = serializers.CharField(source='get_status_display')
    students = serializers.PrimaryKeyRelatedField(many=True,read_only=True)
    class Meta:
        model = Lecture
        fields = "__all__"

class SimpleLectureSerializer(serializers.ModelSerializer):
    students = serializers.PrimaryKeyRelatedField(many=True,read_only=True)
    teacher = serializers.StringRelatedField(many=False)
    class Meta:
        model = Lecture
        fields = ('id','name','teacher','students','cost','start_date','end_date')

class PrimaryKeyLectureSerializer(serializers.ModelSerializer):
    students = serializers.PrimaryKeyRelatedField(many=True,read_only=True)
    teacher = serializers.PrimaryKeyRelatedField(many=False,read_only=True)
    class Meta:
        model = Lecture
        fields = ('id','name','teacher','students')

class LectureCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lecture
        fields = "__all__"

class LessonSerializer(serializers.ModelSerializer):
    lecture = serializers.StringRelatedField(many=False)
    class Meta:
        model = Lesson
        fields = "__all__"
        read_only_fields = ('lecture',)

class LessonCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lesson
        fields = "__all__"

class LessonDetailSerializer(serializers.ModelSerializer):
    lecture = PrimaryKeyLectureSerializer(many=False, read_only=True)
    class Meta:
        model = Lesson
        fields = "__all__"

class EnrollSerializer(serializers.ModelSerializer):
    from studentapp.serializers import SimpleStudentSerializer
    student = SimpleStudentSerializer(many=False, read_only=True)
    lecture = SimpleLectureSerializer(many=False, read_only=True)
    class Meta:
        model = Enroll
        fields = "__all__"
        
class EnrollCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Enroll
        fields = "__all__"

class TestRecordSerializer(serializers.ModelSerializer):
    student = serializers.PrimaryKeyRelatedField(many=False, read_only=True)
    class Meta:
        model = TestRecord
        fields = "__all__"

class TestSerializer(serializers.ModelSerializer):
    records = TestRecordSerializer(many=True, read_only=True)
    class Meta:
        model = Test
        fields = "__all__"

class AttachmentSerializer(serializers.ModelSerializer):
    attachment_file = serializers.FileField(required=True)
    class Meta:
        model = Attachment
        fields = "__all__"

class VideoSerializer(serializers.ModelSerializer):
    lesson = LessonSerializer(many=False, read_only=True)
    class Meta:
        model = Video
        fields = "__all__"

class VideoCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Video
        fields = "__all__"

class VideoWatchRecordSerializer(serializers.ModelSerializer):
    video = VideoSerializer(many=False, read_only=True)
    class Meta:
        model = VideoWatchRecord
        fields = "__all__"

class VideoWatchRecordUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = VideoWatchRecord
        fields = ('id','clicked')


class AttendanceCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attendance
        fields = "__all__"

class AttendanceSerializer(serializers.ModelSerializer):
    lesson = LessonDetailSerializer(many=False, read_only=True)
    class Meta:
        model = Attendance
        fields = "__all__"

class QuestionSerializer(serializers.ModelSerializer):
    from studentapp.serializers import SimpleStudentSerializer
    from accountapp.serializers import CustomUserDetailsSerializer
    answerer = CustomUserDetailsSerializer(many=False, read_only=True)
    student = SimpleStudentSerializer(many=False, read_only=True)
    class Meta:
        model = Question
        fields = "__all__"

class QuestionCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = ('lesson','student','question')

class QuestionUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = ('id','answer','answerer')