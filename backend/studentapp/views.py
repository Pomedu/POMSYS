from django.http import Http404
from django.shortcuts import render

# Create your views here.
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from lectureapp.models import Lecture, Test, TestRecord
from lectureapp.serailizers import LectureSerializer, TestSerializer
from studentapp.models import Student
from studentapp.serializers import StudentSerializer
from teacherapp.models import Teacher
from teacherapp.serailizers import TeacherSerializer


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
        lectures = Lecture.objects.filter(courses__student=student)
        serializer = LectureSerializer(lectures, many=True)
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
        teachers = Teacher.objects.filter(lectures__courses__student=student)
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