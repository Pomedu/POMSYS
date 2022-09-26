from django.contrib import admin
# Register your models here.
from lectureapp.models import Lecture, Lesson, CourseRegistration, Test, TestRecord, Video, VideoWatchRecord, Attendance

admin.site.register(Lecture)
admin.site.register(Lesson)
admin.site.register(CourseRegistration)
admin.site.register(Test)
admin.site.register(TestRecord)
admin.site.register(Video)
admin.site.register(VideoWatchRecord)
admin.site.register(Attendance)
