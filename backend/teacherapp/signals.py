import pandas as pd
from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from datetime import datetime, timedelta
from accountapp.models import User

from studentapp.models import Student
from teacherapp.models import Teacher

@receiver(post_save, sender=Teacher)
def account_link(sender, instance, created, **kwargs):
    if created == True:
        teacher = instance        
        try:
            user = User.objects.get(name=teacher.name, phone_number=teacher.phone_number)
            user.account_linked = True
            user.save()
        except User.DoesNotExist:
            pass
       

