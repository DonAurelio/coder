from django.http import HttpResponse
from django.views.generic import TemplateView
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

from project.models import Project

from wsgiref.util import FileWrapper
import zipfile
import tempfile

class DownloadProjectView(TemplateView):

    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        """Aviod the CSRF token checking when posting data to the server."""
        return super(DownloadProjectView, self).dispatch(request, *args, **kwargs)

    def get(self,request,*args,**kwargs):
        """Return a zip with the given project files."""

        try:

            project_id = kwargs.get('id','')
            project = Project.objects.get(id=project_id)

            files = project.file_set.all()

            project_name = project.name.replace(' ','_')

            response = HttpResponse(content_type='application/zip')
            response['Content-Disposition'] = 'attachment; filename=%s.zip' % project_name
            with zipfile.ZipFile(response,'w',zipfile.ZIP_DEFLATED) as zip_file:
                for file in files:
                    zip_file.writestr(file.name,file.text)

            return response

        except Project.DoesNotExist:
            return HttpResponse('%s does not exist' % project_id)

        