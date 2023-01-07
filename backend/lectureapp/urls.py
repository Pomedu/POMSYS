from django.contrib.auth.decorators import login_required
from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

from lectureapp.views import *


urlpatterns = [
    path('',LectureList.as_view()),
    path('<int:lecture_pk>',LectureDetail.as_view()),
    path('<int:lecture_pk>/enrolls', LectureEnrollList.as_view()),
    path('<int:lecture_pk>/lessons', LectureLessonList.as_view()),
    path('<int:lecture_pk>/tests', LectureTestList.as_view()),
    path('<int:lecture_pk>/videos', LectureVideoList.as_view()),
    path('<int:lecture_pk>/attendances', LectureAttendanceList.as_view()),
    path('<int:lecture_pk>/attachments', LectureAttachmentList.as_view()),
    path('lessons/', AllLessonList.as_view()),
    path('lessons/<int:lesson_pk>', LessonDetail.as_view()),
    path('lessons/<int:lesson_pk>/tests', LessonTestList.as_view()),
    path('lessons/<int:lesson_pk>/videos', LessonVideoList.as_view()),
    path('lessons/<int:lesson_pk>/attendances', LessonAttendanceList.as_view()),
    path('lessons/<int:lesson_pk>/attachments', LessonAttachmentList.as_view()),
    path('lessons/<int:lesson_pk>/questions', LessonQuestionList.as_view()),    
    path('enrolls/', AllEnrollList.as_view()),
    path('enrolls/<int:enroll_pk>', EnrollDelete.as_view()),
    path('tests/', AllTestList.as_view()),
    path('tests/<int:test_pk>', TestDetail.as_view()),
    path('tests/<int:test_pk>/testrecords', TestRecordList.as_view()),
    path('tests/testrecords/<int:testrecord_pk>', TestRecordDetail.as_view()),  
    path('attendances/',AllAttendanceList.as_view()),
    path('attendances/<int:attendance_pk>',AttendanceDetail.as_view()), 
    path('videos/',AllVideoList.as_view()),
    path('videos/<int:video_pk>',VideoDetail.as_view()),
    path('videowatchrecords/<int:videowatchrecord_pk>',VideoWatchRecordDetail.as_view()),  
    path('attachments/', AllAttachmentList.as_view()),
    path('attachments/<int:attachment_pk>',AttachmentDetail.as_view()), 
    path('questions/', AllQuestionList.as_view()),
    path('questions/<int:question_pk>',QuestionDetail.as_view()), 
]

urlpatterns = format_suffix_patterns(urlpatterns)