from django.conf.urls import url
from .views import TemplateList


urlpatterns = [
    url(r'^catt/', TemplateList.as_view(),name='list'),
]