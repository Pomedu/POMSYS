# Generated by Django 4.1.1 on 2023-01-04 07:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accountapp', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='account_linked',
            field=models.BooleanField(default=False),
        ),
    ]
