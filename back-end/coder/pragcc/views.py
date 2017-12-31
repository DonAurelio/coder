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
                data = {
                    'message': "the file '%s' is not compilable" % file.name
                }

                return JsonResponse(data,status=400,safe=False)


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

            return JsonResponse(data,status=status)
            
        except Service.DoesNotExist:

            data = {
                'message': (
                    "Pragcc service is not in service providers,"
                    " please add it to service providers in the database."
                )
            }

            return JsonResponse(data,status=503)


        except Resource.DoesNotExist:

            data = {
                'message': (
                    "Compiler resource does not exists in the data base"
                )
            }

            return JsonResponse(data,status=503)

        except File.DoesNotExist:

            data = {
                'message': (
                    "The file does not exists in the data base"
                )
            }

            return JsonResponse(data,status=503)

        except requests.exceptions.ConnectionError:           

            data = { 
                'message': (
                    "Pragcc service is not available"
                )
            }

            return JsonResponse(data,status=503)


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
        try:

            # Getting the file id
            file_id = kwargs['file_id']

            # Looking for the file we want to parallelize
            file = File.objects.get(id=file_id)

            # If parallel file does not exist, it can raise a
            # Does not exists exception
            parallel_file = file.project.get_file('parallel.yml')

            if not file.is_parallelizable:
                
                data = {
                    'message': (
                        "the file '%s' is not parallelizable" % file.name
                    )
                }

                return JsonResponse(data,status=400)

            if not parallel_file:

                data = {
                    'message': (
                        "This project does not have a parallel.yml file"
                    )
                }

                return JsonResponse(data,status=400)

            service = Service.objects.get(name='pragcc')
            resource = service.resource_set.get(name='openmp')

            data = {
                'raw_parallel_file':parallel_file.text,
                'raw_c_code':file.text
            }

            response = requests.post(resource.url(),json=data)
            
            # If the file can be compiled successfully, the remote service
            # returns a 200 status code, otherwise, it returns 400  
            # indicating the user has a mistake in the code.
            data = response.json()
            status = response.status_code


            if status != 200:
                return JsonResponse(data,status=status)
                
            # If the code was parallelized successfully
            # the response contains the parallelized version
            # of a file, so we keep it into the database

            code_data = response.json()
            
            # The update_or_create method tries to fetch an object 
            # from database based on the given kwargs. if a match 
            # is found, it updates the field passed in the defaults
            # dictionary.

            search = {
                'project':file.project,
                'name':code_data['name']
            }

            obj, created = File.objects.update_or_create(
                defaults=code_data, **search
            )

            obj.save()

            return JsonResponse(data,status=status)

        except Service.DoesNotExist:

            data = {
                'message': (
                    "Pragcc service is not in service providers,"
                    " please add it to service providers in the database."
                )
            }

            return JsonResponse(data,status=503)

        except Resource.DoesNotExist:

            data = {
                'message': (
                    "OpenMP resource does not exists in the data base"
                )
            }
            
            return JsonResponse(data,status=503)

        except File.DoesNotExist as e:

            data = {
                'message': (
                    "The file does not exists in the data base"
                )          
            }

            return JsonResponse(data,status=503)

        except requests.exceptions.ConnectionError:           

            data = {
                'message': (
                    "Pragcc service is not available"
                )
            }

            return JsonResponse(data,status=503)
