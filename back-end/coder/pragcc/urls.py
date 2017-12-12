from django.conf.urls import url
from .views import OpenMP


urlpatterns = [
    url(r'^openmp/parallelize/files/(?P<file_id>\d+)$',OpenMP.as_view())
    # url(r'^openacc/(?P<name>[-\w]+)$', TemplateDetail.as_view()),
]