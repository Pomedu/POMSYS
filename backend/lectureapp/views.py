from django.http import Http404
from django.shortcuts import render

# Create your views here.
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from lectureapp.models import *
from lectureapp.serializers import *


########################################################## 강의(Lecture) ###################################################################
# 전체 강의 리스트 가져오기, 생성하기
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

# 특정 강의 상세정보 가져오기, 수정하기, 삭제하기
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

########################################################## 수강(Enroll) ###################################################################
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

########################################################## 수업(Lesson) ###################################################################
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

# 특정 수업에 대한 상세정보 가져오기, 수정하기, 삭제하기
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

########################################################## 시험(Test) ###################################################################
# 시험 전체 리스트 가져오기, 
class AllTestList(APIView):
    def get(self,request):
        tests = Test.objects.all()
        serializer = TestSerializer(tests, many=True)
        return Response(serializer.data)

    def post(self,request):
        serializer = TestSerializer(data=request.data, many=False)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


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

# 특정 시험의 시험기록 가져오기, 생성하기
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


########################################################## 영상(Video) ###################################################################
# 강의영상 전체 리스트 가져오기,
class AllVideoList(APIView):
    def get(self,request):
        videos = Video.objects.all()
        serializer = VideoSerializer(videos, many=True)
        return Response(serializer.data)
    
    def post(self,request):
        serializer = VideoSerializer(data=request.data, many=False)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# 특정 강의영상 상세정보 보기 수정하기 삭제하기
class VideoDetail(APIView):
    def get_object(self, video_pk):
        try:
            return Video.objects.get(pk=video_pk)
        except Video.DoesNotExist:
            raise Http404

    def get(self, request, video_pk, format=None):
        video = self.get_object(video_pk)
        serializer = VideoSerializer(video)
        return Response(serializer.data)

    def put(self, request, video_pk, format=None):
        video = self.get_object(video_pk)
        serializer = VideoSerializer(video, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, video_pk, format=None):
        video = self.get_object(video_pk)
        video.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# 특정 강의의 강의영상 리스트 가져오기
class LectureVideoList(APIView):
    def get_object(self, lecture_pk):
        try:
            return Lecture.objects.get(pk=lecture_pk)
        except Lecture.DoesNotExist:
            raise Http404

    def get(self, request, lecture_pk, format=None):
        lecture = self.get_object(lecture_pk)
        videos = Video.objects.filter(lesson__lecture=lecture)
        serializer = VideoSerializer(videos, many=True)
        return Response(serializer.data)

# 특정 수업의 강의영상 리스트 가져오기
class LessonVideoList(APIView):
    def get_object(self, lesson_pk):
        try:
            return Lesson.objects.get(pk=lesson_pk)
        except Lesson.DoesNotExist:
            raise Http404

    def get(self, request, lesson_pk, format=None):
        lesson = self.get_object(lesson_pk)
        videos = Video.objects.filter(lesson=lesson)
        serializer = VideoSerializer(videos, many=True)
        return Response(serializer.data)

########################################################## 출석(Attendance) ###################################################################
# 출석 전체 리스트 가져오기,
class AllAttendanceList(APIView):
    def get(self,request):
        attendances = Attendance.objects.all()
        serializer = AttendanceSerializer(attendances, many=True)
        return Response(serializer.data)
    
    def post(self,request):
        serializer = AttendanceSerializer(data=request.data, many=False)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# 특정 출석 상세정보 보기 수정하기 삭제하기
class AttendanceDetail(APIView):
    def get_object(self, attendance_pk):
        try:
            return Attendance.objects.get(pk=attendance_pk)
        except Attendance.DoesNotExist:
            raise Http404

    def get(self, request, attendance_pk, format=None):
        attendance = self.get_object(attendance_pk)
        serializer = AttendanceSerializer(attendance)
        return Response(serializer.data)

    def put(self, request, attendance_pk, format=None):
        attendance = self.get_object(attendance_pk)
        serializer = AttendanceSerializer(attendance, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, attendance_pk, format=None):
        attendance = self.get_object(attendance_pk)
        attendance.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# 특정 강의의 출석 리스트 가져오기
class LectureAttendanceList(APIView):
    def get_object(self, lecture_pk):
        try:
            return Lecture.objects.get(pk=lecture_pk)
        except Lecture.DoesNotExist:
            raise Http404

    def get(self, request, lecture_pk, format=None):
        lecture = self.get_object(lecture_pk)
        attendances = Attendance.objects.filter(lesson__lecture=lecture)
        serializer = AttendanceSerializer(attendances, many=True)
        return Response(serializer.data)

# 특정 수업의 출석 리스트 가져오기
class LessonAttendanceList(APIView):
    def get_object(self, lesson_pk):
        try:
            return Lesson.objects.get(pk=lesson_pk)
        except Lesson.DoesNotExist:
            raise Http404

    def get(self, request, lesson_pk, format=None):
        lesson = self.get_object(lesson_pk)
        attendances = Attendance.objects.filter(lesson=lesson)
        serializer = AttendanceSerializer(attendances, many=True)
        return Response(serializer.data)

########################################################## 첨부파일(Attachment) ###################################################################
# 첨부파일 전체 리스트 가져오기,
class AllAttachmentList(APIView):
    def get(self,request):
        attachments = Attachment.objects.all()
        serializer = AttachmentSerializer(attachments, many=True)
        return Response(serializer.data)
    
    def post(self,request):
        serializer = AttachmentSerializer(data=request.data, many=False)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# 특정 첨부파일 삭제하기
class AttachmentDetail(APIView):
    def get_object(self, attachment_pk):
        try:
            return Attachment.objects.get(pk=attachment_pk)
        except Attachment.DoesNotExist:
            raise Http404

    def delete(self, request, attachment_pk, format=None):
        attachment = self.get_object(attachment_pk)
        attachment.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# 특정 강의의 첨부파일 리스트 가져오기
class LectureAttachmentList(APIView):
    def get_object(self, lecture_pk):
        try:
            return Lecture.objects.get(pk=lecture_pk)
        except Lecture.DoesNotExist:
            raise Http404

    def get(self, request, lecture_pk, format=None):
        lecture = self.get_object(lecture_pk)
        attachments = Attachment.objects.filter(lesson__lecture=lecture)
        serializer = AttachmentSerializer(attachments, many=True)
        return Response(serializer.data)

# 특정 수업의 첨부파일 리스트 가져오기
class LessonAttachmentList(APIView):
    def get_object(self, lesson_pk):
        try:
            return Lesson.objects.get(pk=lesson_pk)
        except Lesson.DoesNotExist:
            raise Http404

    def get(self, request, lesson_pk, format=None):
        lesson = self.get_object(lesson_pk)
        attachments = Attachment.objects.filter(lesson=lesson)
        serializer = AttachmentSerializer(attachments, many=True)
        return Response(serializer.data)
