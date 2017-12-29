from django.http import JsonResponse
from django.views.generic import TemplateView
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

from providers.models import Service, Resource
from project.models import Project, File

import requests
import json
import yaml
 

class TemplateList(TemplateView):
    """List CAs available templates and allows CAs projects creation."""

    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        """Aviod the CSRF token checking when posting data to the server."""
        return super(TemplateList, self).dispatch(request, *args, **kwargs)

    def get(self,request,*args,**kwargs):
        """Return a list of available parallel programming C99 templates."""
        
        try:
            service = Service.objects.get(name='template')
            resource = service.resource_set.get(name='templates')

            response = requests.get(resource.url())
            data = response.json()

            return JsonResponse(data,safe=False)

        except Service.DoesNotExist:

            data = {
                'message': (
                "template service is not in service providers,"
                " please add it to service providers in the database."
                )
            }
            return JsonResponse(data,status=404)

        except Resource.DoesNotExist:

            data = {
                'message': (
                "%s is not a resource of %s service, "
                " please add it as a resource."
                ) % ('templates','Parallel Templates')
            }
            return JsonResponse(data,status=404)

        except requests.exceptions.ConnectionError:           
            data = {
                'message': (
                "Parallel Templates service is not available"
                )
            }
            return JsonResponse(data,status=404)



    def post(self,request,*args,**kwargs):
        """Creates a CA project with the given project settings.

        Given a project and a cafile, a project is crated in
        the data base and all are created two files associated
        with this project. **.c** and ***parallel.yml** files.
        """

        # Getting the data given by the front-end
        data = json.loads(request.body.decode("utf-8"))
        project_data = data['project']
        context_data = data['context']

        project_data.pop('id', None) 
        project_obj = Project(**project_data)

        try:
            service = Service.objects.get(name='template')
            resource = service.resource_set.get(name='templates')

            data = {
                'name':'context.yml',
                'ftype': 'yml',
                'text': yaml.dump(context_data)
            }

            url = resource.url(project_obj.base_template)
            service_response = requests.post(url,json=data)
            service_data = service_response.json()

            # If the catt service us availabe we save the project.      
            project_obj.save()

            # The service retuns a list of files, so we save them 
            # into the data base
            files = service_data
            for file in files:
                file['project'] = project_obj
                new_file = File(**file)
                new_file.save()

            data = {
                'message':'The project was created susccessfully'
            }

            return JsonResponse(data)            

        except Service.DoesNotExist:

            data = {
                'message': (
                "template service is not in service providers,"
                " please add it to service providers in the database."
                )
            }
            return JsonResponse(data,status=404)

        except models.Resource.DoesNotExist:

            data = {
                'message': (
                "templates resource does not exists in the data base"
                )
            }
            return JsonResponse(data,status=404)

        except requests.exceptions.ConnectionError:           
            data = {
                'message': (
                "Parallel Templates service is not available"
                )
            }
            return JsonResponse(data,status=404)


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


