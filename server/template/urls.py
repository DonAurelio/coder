from django.conf.urls import url
from .views import TemplateList, TemplateDetail


urlpatterns = [
    url(r'^templates$', TemplateList.as_view()),
    url(r'^templates/(?P<name>[-\w]+)$', TemplateDetail.as_view()),
]