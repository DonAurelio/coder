from django.conf.urls import url
from .views import DownloadProjectView


urlpatterns = [
	url(r'^(?P<id>[-\d]+)/download$', DownloadProjectView.as_view()),
]