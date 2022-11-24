import pandas as pd
from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from datetime import datetime, timedelta
from accountapp.models import User

from studentapp.models import Student
from teacherapp.models import Teacher

@receiver(post_save, sender=User)
def account_link(sender, instance, created, **kwargs):
    if created == True:
        user = instance
        if user.role == "T":
            try:
                teacher = Teacher.objects.get(name=user.name, phone_number=user.phone_number)
                teacher.account_linked = True
                teacher.save()
            except Teacher.DoesNotExist:
                pass
        elif user.role == "S":
            try:
                student = Student.objects.get(name=user.name, phone_number=user.phone_number)
                student.account_linked = True
                student.save()
            except Student.DoesNotExist:
                pass
        elif user.role == "A": 
            user.is_admin = True
            user.save()

