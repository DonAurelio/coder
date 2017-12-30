from django.http import JsonResponse, HttpResponse
from django.views.generic import TemplateView
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

from project.models import File 
from providers.models import Service, Resource

import requests
import json


class GccCompiler(TemplateView):
    """Check if the given c source code can be compiled successfully."""

    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        """To aviod checking the CSRF token when posting data to the server."""
        return super(GccCompiler, self).dispatch(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):

        try:

            # Getting the id of the file to be compiled
            file_id = kwargs['file_id']

            # Getting the file object from the database
            file = File.objects.get(id=file_id)

            if not file.is_compilable:
                message = (
                    "the file '%s' is not compilable" % file.name
                )
                return JsonResponse(message,status=400,safe=False)


            service = Service.objects.get(name='pragcc')
            resource = service.resource_set.get(name='compiler')

            data = {
                'raw_c_code': file.text
            }

            response = requests.post(resource.url(),json=data)
            
            # If the file can be compiled successfully, the remote service
            # returns a 200 status code, otherwise, it returns 400  
            # indicating the user has a mistake in the code.
            data = response.json()
            status = response.status_code


            return JsonResponse(data,status=status,safe=False)
            
        except Service.DoesNotExist:

            message = (
                "Pragcc service is not in service providers,"
                " please add it to service providers in the database."
            )
            
            return JsonResponse(message,status=503,safe=False)

        except Resource.DoesNotExist:

            message = (
                "Compiler resource does not exists in the data base"
            )
            
            return JsonResponse(message,status=503,safe=False)

        except File.DoesNotExist:

            message = (
                "The file does not exists in the data base"
            )
            
            return JsonResponse(message,status=503,safe=False)

        except requests.exceptions.ConnectionError:           

            message = (
                "Pragcc service is not available"
            )

            return JsonResponse(message,status=503,safe=False)


class OpenMP(TemplateView):
    """Annotate C99 source code with OpenMP compiler directives."""

    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        """To aviod checking the CSRF token when posting data to the server."""
        return super(OpenMP, self).dispatch(request, *args, **kwargs)

    def post(self,request,*args,**kwargs):
        """Parallize annotate the given file with OpenMP compiler directives.

        Creates a new file annotated with OpenMP directives, if the
        given file is parallelizable.
        """

        # Getting the file id
        file_id = kwargs['file_id']

        # Looking for the file we want to parallelize
        file = project.models.File.objects.get(id=file_id)

        if file.is_parallelizable:

            # Before parallelze the file, we verify if it compiles
            # using a remote service.
            resource = models.Resource.objects.get(name='compiler')
            data = { 'raw_c_code': file.text }
            response = requests.post(resource.endpoint_url(),json=data)

            status = response.status_code
            if status == 400:
                message = (
                    "The file '%s' can't be compiled "
                    "correctly, please look for errors before try "
                    "to parallelize it"
                ) % file.name

                # We returns HttpResponse insted JsonResponse
                # becasuse the JsonResponse parse the string adding 
                # doule quote to the same string. This new string 
                # can not be printed in the correct format in the 
                # front end
                # return JsonResponse(message,status=status)
                return HttpResponse(message,status=status)

            elif status == 200:
                # Getting the parallel file from the project
                parallel_file = file.project.get_file('parallel.yml')

                data = {
                    'raw_parallel_file':parallel_file.text,
                    'raw_c_code':file.text
                }

                # Sending the raw parallel file and raw c code
                # to the openmp resource in the pragcc service.
                resource = models.Resource.objects.get(name='openmp')
                response = requests.post(resource.endpoint_url(),json=data)

                if response.status_code == 200:
                    code_data = response.json()
                
                    # The update_or_create method tries to fetch an object 
                    # from database based on the given kwargs. if a match 
                    # is found, it updates the field passed in the defaults
                    # dictionary.

                    search = {
                        'project':file.project,
                        'name':code_data['name']
                    }

                    obj, created = project.models.File.objects.update_or_create(
                        defaults=code_data, **search
                    )

                    obj.save()
                    message = {
                        'message':(
                            "A file '%s' was created on the current project"
                        ) % obj.name
                    }

                    return JsonResponse(message,status=200)

                else:
                    message = response.json()
                    status = response.status_code
                    return JsonResponse(message,status=status)


        message = "The file '%s' is not parallelizable." % file.name
        return HttpResponse(message,status=400)
