from django.contrib.auth.decorators import login_required
from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

from lectureapp.views import LectureList, LectureDetail, AllEnrollList, \
    LectureEnrollList, EnrollDelete, LectureTestList, LessonTestList, AllTestList, TestDetail, \
    TestRecordList, TestRecordDetail

urlpatterns = [
    path('',LectureList.as_view()),
    path('<int:lecture_pk>',LectureDetail.as_view()),
    path('enrolls/', AllEnrollList.as_view()),
    path('enrolls/<int:enroll_pk>', EnrollDelete.as_view()),
    path('<int:lecture_pk>/enrolls', LectureEnrollList.as_view()),
    path('<int:lecture_pk>/tests', LectureTestList.as_view()),
    path('lessons/<int:lesson_pk>/tests', LessonTestList.as_view()),
    path('tests/', AllTestList.as_view()),
    path('tests/<int:test_pk>', TestDetail.as_view()),
    path('tests/<int:test_pk>/testrecords', TestRecordList.as_view()),
    path('tests/testrecords/<int:test_recordpk>', TestRecordDetail.as_view()),

]

urlpatterns = format_suffix_patterns(urlpatterns)