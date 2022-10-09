from django.contrib.auth.decorators import login_required
from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

from studentapp.views import StudentList, StudentDetail, StudentLectureList, StudentTeacherList, StudentTestList, \
    StudentTestRecordList

urlpatterns = [
    path('',StudentList.as_view()),
    path('<int:student_pk>',StudentDetail.as_view()),
    path('<int:student_pk>/lectures', StudentLectureList.as_view()),
    path('<int:student_pk>/teachers', StudentTeacherList.as_view()),
    path('<int:student_pk>/tests', StudentTestList.as_view()),
    path('<int:student_pk>/testrecords', StudentTestRecordList.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)