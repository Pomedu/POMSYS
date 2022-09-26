from django.http import Http404
from django.shortcuts import render

# Create your views here.
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from lectureapp.models import Lecture
from lectureapp.serailizers import LectureSerializer
from studentapp.models import Student
from studentapp.serializers import StudentSerializer
from teacherapp.models import Teacher
from teacherapp.serailizers import TeacherSerializer


class TeacherList(APIView):
    def get(self,request):
        teachers = Teacher.objects.all()
        serializer = TeacherSerializer(teachers, many=True)
        return Response(serializer.data)

    def post(self,request):
        serializer = TeacherSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class TeacherDetail(APIView):
    def get_object(self, teacher_pk):
        try:
            return Teacher.objects.get(pk=teacher_pk)
        except Teacher.DoesNotExist:
            raise Http404

    def get(self, request, teacher_pk, format=None):
        teacher = self.get_object(teacher_pk)
        serializer = TeacherSerializer(teacher)
        return Response(serializer.data)

    def put(self, request, teacher_pk, format=None):
        teacher = self.get_object(teacher_pk)
        serializer = TeacherSerializer(teacher, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, teacher_pk, format=None):
        teacher = self.get_object(teacher_pk)
        teacher.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# 특정 강사의 강의 리스트
class TeacherLectureList(APIView):
    def get_object(self, teacher_pk):
        try:
            return Teacher.objects.get(pk=teacher_pk)
        except Teacher.DoesNotExist:
            raise Http404

    def get(self, request, teacher_pk, format=None):
        teacher = self.get_object(teacher_pk)
        lectures = Lecture.objects.filter(teacher=teacher)
        serializer = LectureSerializer(lectures, many=True)
        return Response(serializer.data)

# 특정 강사의 학생 리스트
class TeacherStudentList(APIView):
    def get_object(self, teacher_pk):
        try:
            return Teacher.objects.get(pk=teacher_pk)
        except Teacher.DoesNotExist:
            raise Http404

    def get(self, request, teacher_pk, format=None):
        teacher = self.get_object(teacher_pk)
        students = Student.objects.filter(course__lecture__teacher=teacher)
        serializer = StudentSerializer(students, many=True)
        return Response(serializer.data)



