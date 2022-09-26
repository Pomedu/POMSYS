from django.core.validators import RegexValidator
from django.db import models

phoneNumberRegex = RegexValidator(regex=r'^01([0|1|6|7|8|9]?)-?([0-9]{3,4})-?([0-9]{4})$',
                                  message="올바른 전화번호 양식을 입력해주세요 ex)010-0000-0000")

class Teacher(models.Model):
    subject_choices = (
        ('kor', '국어'),
        ('math', '수학'),
        ('eng', '영어'),
        ('sci', '과학'),
        ('soc', '사회'),
        ('ess', '논술')
    )
    name = models.CharField(max_length=10, null=False)
    phone_number = models.CharField(validators=[phoneNumberRegex], max_length=13, null=False)
    subject = models.CharField(max_length = 5 ,choices=subject_choices, null=False)
    created_at = models.DateField(auto_now_add=True, null=False)
    is_active = models.BooleanField(default=True)
    account_linked = models.BooleanField(default=False)
    def __str__(self):
        return self.name

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['name','phone_number'],
                name='unique_teacher'
            )
        ]