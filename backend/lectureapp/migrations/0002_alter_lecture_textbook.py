# Generated by Django 4.0.6 on 2022-09-19 07:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('lectureapp', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='lecture',
            name='textbook',
            field=models.JSONField(default=dict, null=True),
        ),
    ]
