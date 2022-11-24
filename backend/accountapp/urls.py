from django.contrib.auth.decorators import login_required
from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

from accountapp.views import *


urlpatterns = [
   
]

urlpatterns = format_suffix_patterns(urlpatterns)