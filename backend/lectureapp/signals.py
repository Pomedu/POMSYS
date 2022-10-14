import datetime
import pandas as pd
from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from lectureapp.models import Lesson, Lecture

@receiver(post_save, sender=Lecture)
def create_lessons(sender, instance, created, **kwargs):
    lecture = instance
    if created == True:
        lecture = instance
        date_list = pd.date_range(lecture.start_date,lecture.end_date)
        day_start_time = {}
        day_end_time = {}
        for coursetime in lecture.coursetime:
            day_start_time[coursetime['day']]=coursetime['start_time']
            day_end_time[coursetime['day']] = coursetime['end_time']
        for date in date_list:
            try:
                Lesson.objects.create(
                lecture = lecture,
                date = date,
                start_time = datetime.datetime.strptime(day_start_time[date.weekday()],'%H%M').time(),
                end_time = datetime.datetime.strptime(day_end_time[date.weekday()],'%H%M').time(),
                done = False if date > datetime.today() else True
                )
            except:
                pass
       

@receiver(post_delete, sender=Lecture)
def delete_lessons(sender, instance, **kwargs):
    lecture = instance
    delete_list = lecture.lessons.filter(done=False)
    for del_lesson in delete_list:
        del_lesson.delete()
