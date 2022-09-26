from django.core.validators import FileExtensionValidator
from django.db import models

from studentapp.models import Student
from teacherapp.models import Teacher


class Lecture(models.Model):
    status_choices = (
        ('P', '대기'),
        ('O', '진행중'),
        ('F', '종강'),
    )
    name = models.CharField(max_length=100, null=False)
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE, related_name='lectures', null=False)
    description = models.TextField(null=True,blank=True)
    start_date = models.DateField(null=True)
    end_date = models.DateField(null=True)
    coursetime = models.JSONField(default=list, null=False) #{'day':0,'start_time': '1800','end_time': '1930'}
    status = models.CharField(max_length=20, choices=status_choices, null=False)
    cost = models.IntegerField(null=True, blank=True)
    textbook = models.JSONField(default=list, null=True, blank=True)
    students = models.ManyToManyField(Student, through='CourseRegistration', related_name='lectures')
    def __str__(self):
        return self.name

class Lesson(models.Model):
    lecture = models.ForeignKey(Lecture, on_delete=models.CASCADE, related_name='lessons')
    date =  models.DateField(null=False)
    start_time = models.TimeField(null=False)
    end_time = models.TimeField(null=False)
    done = models.BooleanField(default=False)
    def __str__(self):
        return str(self.lecture)+" - "+str(self.date)

class CourseRegistration(models.Model):
    lecture = models.ForeignKey(Lecture, on_delete=models.CASCADE, related_name='courses')
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='courses')
    joined_at = models.DateField(null=False)
    created_at = models.DateField(auto_now_add=True, null=False)
    class Meta:
        unique_together = ('student', 'lecture')
    def __str__(self):
        return str(self.lecture)+" - "+str(self.student)


class Test(models.Model):
    name = models.CharField(max_length=10, null=False)
    lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE, related_name='tests')
    test_file = models.FileField(upload_to='tests/', null=True, validators=[FileExtensionValidator(allowed_extensions=["pdf"])])
    average_score = models.FloatField(null=True, blank=True)

    def __str__(self):
        return str(self.lesson) + " - " + str(self.name)


class TestRecord(models.Model):
    test = models.ForeignKey(Test, on_delete=models.CASCADE, related_name='records')
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='testrecords')
    date = models.DateField(null=False, blank=False)
    score = models.FloatField(null=False, blank=False)

class Video(models.Model):
    lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE, related_name='videos')
    link = models.URLField(max_length=250, null=False, blank=False)

class VideoWatchRecord(models.Model):
    video = models.ForeignKey(Video, on_delete=models.CASCADE, related_name='watchrecords')
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='videowatchrecords')
    clicked = models.IntegerField(default=0, blank=True)

class Attendance(models.Model):
    lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE, related_name='attendees')
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='attendance')
    attend = models.BooleanField(default=True)
    description = models.CharField(max_length=20, blank=True, null=True)