import pandas as pd
from django.db.models.signals import post_save
from django.dispatch import receiver
from datetime import datetime, timedelta
from lectureapp.models import Lesson, Lecture, Attendance

# 강의=>일일수업 오브젝트 자동생성
@receiver(post_save, sender=Lecture)
def create_lessons(sender, instance, created, **kwargs):
    if created == True:
        lecture = instance
        date_list = pd.date_range(lecture.start_date,lecture.end_date)
        day_start_time = {}
        day_end_time = {}
        for coursetime in lecture.coursetime:
            day_start_time[coursetime['day']]=coursetime['start_time']
            day_end_time[coursetime['day']] = coursetime['end_time']
        for date in date_list:
            if date.weekday() in day_start_time:
                Lesson.objects.create(
                    lecture = lecture,
                    date = date,
                    start_time = datetime.strptime(day_start_time[date.weekday()],'%H%M').time(),
                    end_time = datetime.strptime(day_end_time[date.weekday()],'%H%M').time(),
                    done = False if date >= datetime.today() else True
                    )
    else:# 수정하는 경우 
        lecture = instance
        delete_list = lecture.lessons.filter(done=False)
        for del_lesson in delete_list:
            del_lesson.delete()
        if lecture.start_date > datetime.today().date():
            date_list = pd.date_range(lecture.start_date, lecture.end_date)
        else:
            date_list = pd.date_range(datetime.today()+timedelta(days=1), lecture.end_date)
        day_start_time = {}
        day_end_time = {}
        for coursetime in lecture.coursetime:
            day_start_time[coursetime['day']] = coursetime['start_time']
            day_end_time[coursetime['day']] = coursetime['end_time']
        for date in date_list:
            if date.weekday() in day_start_time:
                Lesson.objects.create(
                    lecture=lecture,
                    date=date,
                    start_time=datetime.strptime(day_start_time[date.weekday()], '%H%M').time(),
                    end_time=datetime.strptime(day_end_time[date.weekday()], '%H%M').time(),
                    done=False if date > datetime.today() else True
                )
