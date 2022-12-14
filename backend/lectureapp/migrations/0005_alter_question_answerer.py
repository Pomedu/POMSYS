# Generated by Django 4.0.6 on 2023-01-08 04:25

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('lectureapp', '0004_alter_question_answerer'),
    ]

    operations = [
        migrations.AlterField(
            model_name='question',
            name='answerer',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='questions', to=settings.AUTH_USER_MODEL),
        ),
    ]
