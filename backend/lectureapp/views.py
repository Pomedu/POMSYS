from django.http import Http404
from django.shortcuts import render

# Create your views here.
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from lectureapp.models import Lecture, Enroll, Test, Lesson, TestRecord
from lectureapp.serializers import LectureSerializer, EnrollSerializer, EnrollCreateSerializer, TestSerializer, TestRecordSerializer, \
LectureCreateSerializer, LessonSerializer, LessonDetailSerializer


class LectureList(APIView):
    def get(self,request):
        lectures = Lecture.objects.all()
        serializer = LectureSerializer(lectures, many=True)
        return Response(serializer.data)

    def post(self,request):
        serializer = LectureCreateSerializer(data=request.data)
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
        serializer = LectureCreateSerializer(lecture)
        return Response(serializer.data)

    def put(self, request, lecture_pk, format=None):
        lecture = self.get_object(lecture_pk)
        serializer = LectureCreateSerializer(lecture, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, lecture_pk, format=None):
        lecture = self.get_object(lecture_pk)
        lecture.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# 전체 수강 목록 가져오기, 수강 등록하기
class AllEnrollList(APIView):
    def get(self,request):
        enrolls = Enroll.objects.all()
        serializer = EnrollSerializer(enrolls, many=True)
        return Response(serializer.data)
    
    def post(self,request):
        serializer = EnrollCreateSerializer(data=request.data, many=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# 특정 수강 정보 삭제하기
class EnrollDelete(APIView):
    def get_object(self, enroll_pk):
        try:
            return Enroll.objects.get(pk=enroll_pk)
        except Enroll.DoesNotExist:
            raise Http404

    def delete(self, request, enroll_pk, format=None):
        enroll = self.get_object(enroll_pk)
        enroll.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# 특정 강의의 수강정보 가져오기
class LectureEnrollList(APIView):
    def get_object(self, lecture_pk):
        try:
            return Lecture.objects.get(pk=lecture_pk)
        except Lecture.DoesNotExist:
            raise Http404

    def get(self, request, lecture_pk, format=None):
        lecture = self.get_object(lecture_pk)
        enrolls = Enroll.objects.filter(lecture=lecture)
        serializer = EnrollSerializer(enrolls, many=True)
        return Response(serializer.data)

# 전체 수업 리스트 가져오기 및 생성하기
class AllLessonList(APIView):
    def get(self,request):
        lessons = Lesson.objects.all()
        serializer = LessonSerializer(lessons, many=True)
        return Response(serializer.data)
    
    def post(self,request):
        serializer = LessonSerializer(data=request.data, many=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LessonDetail(APIView):
    def get_object(self, lesson_pk):
        try:
            return Lesson.objects.get(pk=lesson_pk)
        except Lesson.DoesNotExist:
            raise Http404

    def get(self, request, lesson_pk, format=None):
        lesson = self.get_object(lesson_pk)
        serializer = LessonDetailSerializer(lesson)
        return Response(serializer.data)

    def put(self, request, lesson_pk, format=None):
        lesson = self.get_object(lesson_pk)
        serializer = LessonSerializer(lesson, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, lesson_pk, format=None):
        lesson = self.get_object(lesson_pk)
        lesson.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# 특정 강의의 수업리스트 가져오기
class LectureLessonList(APIView):
    def get_object(self, lecture_pk):
        try:
            return Lecture.objects.get(pk=lecture_pk)
        except Lecture.DoesNotExist:
            raise Http404

    def get(self, request, lecture_pk, format=None):
        lecture = self.get_object(lecture_pk)
        lessons = Lesson.objects.filter(lecture=lecture)
        serializer = LessonSerializer(lessons, many=True)
        return Response(serializer.data)

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
