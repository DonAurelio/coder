from django.conf.urls import url
from .views import TemplateList, TemplateDetail


urlpatterns = [
    url(r'^template/$', TemplateList.as_view()),
    url(r'^template/(?P<name>[-\w]+)$', TemplateDetail.as_view()),
]