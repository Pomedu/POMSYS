from django.contrib import admin
# Register your models here.
from lectureapp.models import Lecture, Lesson, Enroll, Test, TestRecord, Video, VideoWatchRecord, Attendance

class LessonAdmin(admin.ModelAdmin):
    list_display = ['lecture', 'date', 'done']
    list_display_links = ['date']

admin.site.register(Lecture)
admin.site.register(Lesson,LessonAdmin)
admin.site.register(Enroll)
admin.site.register(Test)
admin.site.register(TestRecord)
admin.site.register(Video)
admin.site.register(VideoWatchRecord)
admin.site.register(Attendance)