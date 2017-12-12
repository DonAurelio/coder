from django.http import JsonResponse
from django.views.generic import TemplateView
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

from . import models
import project

import requests
import json
 

class TemplateList(TemplateView):
    """List CAs available templates and allows CAs projects creation."""

    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        """Aviod checking the CSRF token when posting data to the server."""
        return super(TemplateList, self).dispatch(request, *args, **kwargs)

    def get(self,request,*args,**kwargs):
        """Return a list of available parallel programming C99 templates."""
        
        resource = models.Resource.objects.get(name='templates')
        response = requests.get(resource.endpoint_url())
        data = response.json()
        
        return JsonResponse(data)

    def post(self,request,*args,**kwargs):
        """Creates a CA project with the given project settings.

        Given a project and a cafile, a project is crated in
        the data base and all are created two files associated
        with this project. **.c** and ***parallel.yml** files.
        """

        # Getting the data given by the front-end
        data = json.loads(request.body.decode("utf-8"))
        project_data = data['project']
        cafile_data = data['cafile']

        project_obj = project_app.models.Project(
            name=project_data['name'],
            description=project_data['description'],
            base_template=project_data['base_template']
        )

        cafile = models.Cafile(**cafile_data)

        # Calling Catt external service to resquest 
        # data regarding the requested template
        resource = models.Resource.objects.get(name='templates')
        url = resource.endpoint_url(arg=project_obj.base_template)

        catt_service_response = requests.post(url,json=cafile.data)
        catt_service_data = catt_service_response.json()

        # If the catt service us availabe we save the project.      
        project_obj.save()

        files = catt_service_data['data']['files']
        for file in files:
            new_file = project.models.File(
                project=project_obj,
                name=file['name'],
                ftype=file['type'],
                text=file['text']
            )
            new_file.save()

        data = {
            'message':'The project was created susccessfully'
        }

        return JsonResponse(data)


class TemplateDetail(TemplateView):
    """Gives a detail of a given CA C99 parallel programming template."""

    def get(self,request,*args,**kwargs):
        """Retunrs a detail of a given CA C99 template."""

        template_name = kwargs['name']
        resource = Resource.objects.get(name='templates')
        url = resource.endpoint_url(arg=template_name)
        response = requests.get(url)
        data = response.json()

        return JsonResponse(data)


