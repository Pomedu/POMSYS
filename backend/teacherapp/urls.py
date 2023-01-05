from django.contrib.auth.decorators import login_required
from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

from teacherapp.views import TeacherList, TeacherDetail, TeacherLectureList, TeacherStudentList, TeacherLessonList, TeacherEnrollList

urlpatterns = {
    path('', TeacherList.as_view()),
    path('<int:teacher_pk>', TeacherDetail.as_view()),
    path('<int:teacher_pk>/lectures', TeacherLectureList.as_view()),
    path('<int:teacher_pk>/students', TeacherStudentList.as_view()),
    path('<int:teacher_pk>/enrolls', TeacherEnrollList.as_view()),
    path('<int:teacher_pk>/lessons', TeacherLessonList.as_view()),
}

urlpatterns = format_suffix_patterns(urlpatterns)