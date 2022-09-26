from django.http import Http404
from django.shortcuts import render

# Create your views here.
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from lectureapp.models import Lecture, CourseRegistration, Test, Lesson, TestRecord
from lectureapp.serailizers import LectureSerializer, CourseRegistrationSerializer, TestSerializer, TestRecordSerializer


class LectureList(APIView):
    def get(self,request):
        lectures = Lecture.objects.all()
        serializer = LectureSerializer(lectures, many=True)
        return Response(serializer.data)

    def post(self,request):
        serializer = LectureSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LectureDetail(APIView):
    def get_object(self, lecture_pk):
        try:
            return Lecture.objects.get(pk=lecture_pk)
        except Lecture.DoesNotExist:
            raise Http404

    def get(self, request, lecture_pk, format=None):
        lecture = self.get_object(lecture_pk)
        serializer = LectureSerializer(lecture)
        return Response(serializer.data)

    def put(self, request, lecture_pk, format=None):
        lecture = self.get_object(lecture_pk)
        serializer = LectureSerializer(lecture, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, lecture_pk, format=None):
        lecture = self.get_object(lecture_pk)
        lecture.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# 전체 수강 목록 가져오기, 수강 등록하기
class AllCourseRegistrationList(APIView):
    def get(self,request):
        courseregistrations = CourseRegistration.objects.all()
        serializer = CourseRegistrationSerializer(courseregistrations, many=True)
        return Response(serializer.data)

# 특정 수강 정보 삭제하기
class CourseRegistrationDelete(APIView):
    def get_object(self, courseregistration_pk):
        try:
            return CourseRegistration.objects.get(pk=courseregistration_pk)
        except CourseRegistration.DoesNotExist:
            raise Http404

    def delete(self, request, courseregistration_pk, format=None):
        courseregistration = self.get_object(courseregistration_pk)
        courseregistration.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# 특정 강의의 수강정보 가져오기, 수강 등록하기
class LectureCourseRegistrationList(APIView):
    def get_object(self, lecture_pk):
        try:
            return Lecture.objects.get(pk=lecture_pk)
        except Lecture.DoesNotExist:
            raise Http404

    def get(self, request, lecture_pk, format=None):
        lecture = self.get_object(lecture_pk)
        courseregistrations = CourseRegistration.objects.filter(lecture=lecture)
        serializer = CourseRegistrationSerializer(courseregistrations, many=True)
        return Response(serializer.data)

    def post(self, request, lecture_pk, format=None):
        lecture = self.get_object(lecture_pk)
        serializer = CourseRegistrationSerializer(data=request.data, many=True)
        if serializer.is_valid():
            serializer.save(lecture=lecture)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# 시험 전체 리스트 가져오기,
class AllTestList(APIView):
    def get(self,request):
        tests = Test.objects.all()
        serializer = TestSerializer(tests, many=True)
        return Response(serializer.data)

# 특정 강의의 시험 리스트 가져오기
class LectureTestList(APIView):
    def get_object(self, lecture_pk):
        try:
            return Lecture.objects.get(pk=lecture_pk)
        except Lecture.DoesNotExist:
            raise Http404

    def get(self, request, lecture_pk, format=None):
        lecture = self.get_object(lecture_pk)
        tests = Test.objects.filter(lesson__lecture=lecture)
        serializer = TestSerializer(tests, many=True)
        return Response(serializer.data)

# 특정 수업의 시험 리스트 가져오기
class LessonTestList(APIView):
    def get_object(self, lesson_pk):
        try:
            return Lesson.objects.get(pk=lesson_pk)
        except Lesson.DoesNotExist:
            raise Http404

    def get(self, request, lesson_pk, format=None):
        lesson = self.get_object(lesson_pk)
        tests = Test.objects.filter(lesson=lesson)
        serializer = TestSerializer(tests, many=True)
        return Response(serializer.data)

# 특정 시험 상세정보 보기 수정하기 삭제하기
class TestDetail(APIView):
    def get_object(self, test_pk):
        try:
            return Test.objects.get(pk=test_pk)
        except Test.DoesNotExist:
            raise Http404

    def get(self, request, test_pk, format=None):
        test = self.get_object(test_pk)
        serializer = TestSerializer(test)
        return Response(serializer.data)

    def put(self, request, test_pk, format=None):
        test = self.get_object(test_pk)
        serializer = TestSerializer(test, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, test_pk, format=None):
        test = self.get_object(test_pk)
        test.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# 특정 시험의 시험기록 가져오기
class TestRecordList(APIView):
    def get_object(self, test_pk):
        try:
            return Test.objects.get(pk=test_pk)
        except Test.DoesNotExist:
            raise Http404

    def get(self, request, test_pk, format=None):
        test = self.get_object(test_pk)
        testrecords = TestRecord.objects.filter(test=test)
        serializer = TestRecordSerializer(testrecords, many=True)
        return Response(serializer.data)

# 특정 시험기록 상세정보 보기 수정하기 삭제하기
class TestRecordDetail(APIView):
    def get_object(self, testrecord_pk):
        try:
            return TestRecord.objects.get(pk=testrecord_pk)
        except TestRecord.DoesNotExist:
            raise Http404

    def get(self, request, testrecord_pk, format=None):
        testrecord = self.get_object(testrecord_pk)
        serializer = TestRecordSerializer(testrecord)
        return Response(serializer.data)

    def put(self, request, testrecord_pk, format=None):
        testrecord = self.get_object(testrecord_pk)
        serializer = TestRecordSerializer(testrecord, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, testrecord_pk, format=None):
        testrecord = self.get_object(testrecord_pk)
        testrecord.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
