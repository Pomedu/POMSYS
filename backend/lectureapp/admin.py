from django.contrib import admin
# Register your models here.
from lectureapp.models import *
class LessonAdmin(admin.ModelAdmin):
    list_display = ['lecture', 'date', 'done']
    list_display_links = ['date']

class AttendanceAdmin(admin.ModelAdmin):
    list_display = ['lesson', 'student', 'attend']
    list_display_links = ['student']

class QuestionAdmin(admin.ModelAdmin):
    list_display = ['lesson', 'student', 'question']
    list_display_links = ['question']


admin.site.register(Lecture)
admin.site.register(Lesson,LessonAdmin)
admin.site.register(Enroll)
admin.site.register(Test)
admin.site.register(TestRecord)
admin.site.register(Video)
admin.site.register(VideoWatchRecord)
admin.site.register(Attendance, AttendanceAdmin)
admin.site.register(Question, QuestionAdmin)