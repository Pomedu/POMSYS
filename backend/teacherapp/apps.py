from django.apps import AppConfig


class TeacherappConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'teacherapp'

    def ready(self):
        import teacherapp.signals