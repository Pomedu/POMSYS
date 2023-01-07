from django.http import Http404
from django.shortcuts import render

# Create your views here.
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from lectureapp.models import *
from lectureapp.serializers import *
from studentapp.models import Student
from studentapp.serializers import StudentSerializer
from teacherapp.models import Teacher
from teacherapp.serializers import TeacherSerializer


class StudentList(APIView):
    def get(self,request):
        students = Student.objects.all()
        serializer = StudentSerializer(students, many=True)
        return Response(serializer.data)

    def post(self,request):
        serializer = StudentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class StudentDetail(APIView):
    def get_object(self, student_pk):
        try:
            return Student.objects.get(pk=student_pk)
        except Student.DoesNotExist:
            raise Http404

    def get(self, request, student_pk, format=None):
        student = self.get_object(student_pk)
        serializer = StudentSerializer(student)
        return Response(serializer.data)

    def put(self, request, student_pk, format=None):
        student = self.get_object(student_pk)
        serializer = StudentSerializer(student, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, student_pk, format=None):
        student = self.get_object(student_pk)
        student.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# 특정 학생의 강의리스트
class StudentLectureList(APIView):
    def get_object(self, student_pk):
        try:
            return Student.objects.get(pk=student_pk)
        except Student.DoesNotExist:
            raise Http404

    def get(self, request, student_pk, format=None):
        student = self.get_object(student_pk)
        lectures = Lecture.objects.filter(enrolls__student=student)
        serializer = LectureSerializer(lectures, many=True)
        return Response(serializer.data)

# 특정 학생의 수강정보리스트
class StudentEnrollList(APIView):
    def get_object(self, student_pk):
        try:
            return Student.objects.get(pk=student_pk)
        except Student.DoesNotExist:
            raise Http404

    def get(self, request, student_pk, format=None):
        student = self.get_object(student_pk)
        enrolls = Enroll.objects.filter(student=student)
        serializer = EnrollSerializer(enrolls, many=True)
        return Response(serializer.data)

# 특정 학생의 수업리스트
class StudentLessonList(APIView):
    def get_object(self, student_pk):
        try:
            return Student.objects.get(pk=student_pk)
        except Student.DoesNotExist:
            raise Http404

    def get(self, request, student_pk, format=None):
        student = self.get_object(student_pk)
        lessons = Lesson.objects.filter(lecture__enrolls__student=student)
        serializer = LessonDetailSerializer(lessons, many=True)
        return Response(serializer.data)

# 특정 학생의 강사리스트
class StudentTeacherList(APIView):
    def get_object(self, student_pk):
        try:
            return Student.objects.get(pk=student_pk)
        except Student.DoesNotExist:
            raise Http404

    def get(self, request, student_pk, format=None):
        student = self.get_object(student_pk)
        teachers = Teacher.objects.filter(lectures__enrolls__student=student)
        serializer = TeacherSerializer(teachers, many=True)
        return Response(serializer.data)

# 특정 학생이 친 시험리스트
class StudentTestList(APIView):
    def get_object(self, student_pk):
        try:
            return Student.objects.get(pk=student_pk)
        except Student.DoesNotExist:
            raise Http404

    def get(self, request, student_pk, format=None):
        student = self.get_object(student_pk)
        tests = Test.objects.filter(records__student=student)
        serializer = TestSerializer(tests, many=True)
        return Response(serializer.data)

# 특정 학생이 친 시험 결과리스트
class StudentTestRecordList(APIView):
    def get_object(self, student_pk):
        try:
            return Student.objects.get(pk=student_pk)
        except Student.DoesNotExist:
            raise Http404

    def get(self, request, student_pk, format=None):
        student = self.get_object(student_pk)
        testrecords = student.testrecords.all()
        serializer = TestSerializer(testrecords, many=True)
        return Response(serializer.data)


# 특정 학생이 볼 수 있는 영상 리스트
class StudentVideoList(APIView):
    def get_object(self, student_pk):
        try:
            return Student.objects.get(pk=student_pk)
        except Student.DoesNotExist:
            raise Http404

    def get(self, request, student_pk, format=None):
        student = self.get_object(student_pk)
        videos = Video.objects.filter(lesson__lecture__enrolls__student=student)
        serializer = VideoSerializer(videos, many=True)
        return Response(serializer.data)

# 특정 학생의 영상 수강 기록
class StudentVideoWatchRecordList(APIView):
    def get_object(self, student_pk):
        try:
            return Student.objects.get(pk=student_pk)
        except Student.DoesNotExist:
            raise Http404

    def get(self, request, student_pk, format=None):
        student = self.get_object(student_pk)
        videowatchrecords = VideoWatchRecord.objects.filter(student=student)
        serializer = VideoWatchRecordSerializer(videowatchrecords , many=True)
        return Response(serializer.data)

# 특정 학생의 출석 리스트
class StudentAttendanceList(APIView):
    def get_object(self, student_pk):
        try:
            return Student.objects.get(pk=student_pk)
        except Student.DoesNotExist:
            raise Http404

    def get(self, request, student_pk, format=None):
        student = self.get_object(student_pk)
        attendances = Attendance.objects.filter(student=student)
        serializer = AttendanceSerializer(attendances , many=True)
        return Response(serializer.data)

# 특정 학생의 질문답변 가져오기
class StudentQuestionList(APIView):
    def get_object(self, student_pk):
        try:
            return Student.objects.get(pk=student_pk)
        except Student.DoesNotExist:
            raise Http404

    def get(self, request, student_pk, format=None):
        student = self.get_object(student_pk)
        questions = Question.objects.filter(student=student)
        serializer = QuestionSerializer(questions , many=True)
        return Response(serializer.data)
