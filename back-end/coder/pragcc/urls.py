from django.conf.urls import url
from .views import OpenMP, GccCompiler


urlpatterns = [
    url(r'^openmp/parallelize/files/(?P<file_id>\d+)$',OpenMP.as_view()),
    url(r'^compiler/compile/files/(?P<file_id>\d+)$',GccCompiler.as_view()),
]