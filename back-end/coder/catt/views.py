from django.http import JsonResponse
from django.views.generic import TemplateView
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from .models import Resource, Cafile
import requests
import json
import project as project_app


def exception_handler(function):
    def wrapper(self,request,*args,**kwargs):
        
        try:
            json_response =  function(self,request,*args,**kwargs)

        except requests.exceptions.ConnectionError:
            data = {
                'error':'Catt external service not available.'
            }
            json_response = JsonResponse(data)
        
        return json_response

    return wrapper


class TemplateList(TemplateView):

    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        # To aviod checking the CSRF token when posting data to the server 
        return super(TemplateList, self).dispatch(request, *args, **kwargs)

    @exception_handler
    def get(self,request,*args,**kwargs):

        resource = Resource.objects.get(name='templates')
        response = requests.get(resource.endpoint_url())
        data = response.json()
        
        return JsonResponse(data)

    @exception_handler
    def post(self,request,*args,**kwargs):

        # Getting the data given by the front-end
        data = json.loads(request.body.decode("utf-8"))
        project_data = data['project']
        cafile_data = data['cafile']

        project = project_app.models.Project(
            name=project_data['name'],
            description=project_data['description'],
            base_template=project_data['base_template']
        )

        cafile = Cafile(**cafile_data)

        # Calling Catt external service to resquest 
        # data regarding the requested template
        resource = Resource.objects.get(name='templates')
        url = resource.endpoint_url(arg=project.base_template)
        catt_service_response = requests.post(url,data=cafile.data)
        catt_service_data = catt_service_response.json()

        # If the catt service us availabe we save the project.      
        project.save()

        # and we create files with the data returned by catt
        # service.

        # catt_service_data['success']
        # catt_service_data['error']
        # catt_service_data['data']

        files = catt_service_data['data']['files']
        for file in files:
            new_file = project_app.models.File(
                project=project,
                name=file['name'],
                ftype=file['type'],
                text=file['text']
            )
            new_file.save()

        return JsonResponse(data)


class TemplateDetail(TemplateView):

    @exception_handler
    def get(self,request,*args,**kwargs):

        template_name = kwargs['name']
        resource = Resource.objects.get(name='templates')
        url = resource.endpoint_url(arg=template_name)
        response = requests.get(url)
        data = response.json()

        return JsonResponse(data)


