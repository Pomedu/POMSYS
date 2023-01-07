from django.contrib.auth.decorators import login_required
from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

from studentapp.views import *

urlpatterns = [
    path('',StudentList.as_view()),
    path('<int:student_pk>',StudentDetail.as_view()),
    path('<int:student_pk>/lectures', StudentLectureList.as_view()),
    path('<int:student_pk>/lessons', StudentLessonList.as_view()),
    path('<int:student_pk>/teachers', StudentTeacherList.as_view()),
    path('<int:student_pk>/tests', StudentTestList.as_view()),
    path('<int:student_pk>/testrecords', StudentTestRecordList.as_view()),
    path('<int:student_pk>/videos', StudentVideoList.as_view()),
    path('<int:student_pk>/videowatchrecords', StudentVideoWatchRecordList.as_view()),
    path('<int:student_pk>/attendances', StudentAttendanceList.as_view())
]

urlpatterns = format_suffix_patterns(urlpatterns)