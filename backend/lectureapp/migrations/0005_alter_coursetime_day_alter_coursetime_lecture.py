# Generated by Django 4.0.6 on 2022-09-22 05:18

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('lectureapp', '0004_lesson_done_alter_lecture_cost_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='coursetime',
            name='day',
            field=models.CharField(choices=[('0', '월'), ('1', '화'), ('2', '수'), ('3', '목'), ('4', '금'), ('5', '토'), ('6', '일')], max_length=3),
        ),
        migrations.AlterField(
            model_name='coursetime',
            name='lecture',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='times', to='lectureapp.lecture'),
        ),
    ]
