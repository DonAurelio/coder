from django.http import JsonResponse
from django.views.generic import TemplateView
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

import project

import requests
import json


class OpenMP(TemplateView):
    """Annotate C99 source code with OpenMP compiler directives."""

    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        """To aviod checking the CSRF token when posting data to the server."""
        return super(OpenMPAnnotation, self).dispatch(request, *args, **kwargs)

    def post(self,request,*args,**kwargs):
        """Parallize annotate the given file with OpenMP compiler directives.

        Creates a new file annotated with OpenMP directives, if the
        given file is parallelizable.

        Decir si el archivo es paraleizable y si no es parallelizable entonces 
        manda un mensaje diciendo que no es parallelizable.
        """

        # Getting the file id
        file_id = kwargs['file_id']

        # Looking for the file we want to parallelize
        file_obj = project.models.File.get(id=file_id)

        file_obj = project.models.File(
            project=project_obj,
            name='Test file',
            ftype='c99',
            text='Some test !!!!'
        )
        file_obj.save()
        project_obj.add_file(file_obj)
        project_obj.save()

        {
            'message':'The file was parallelized succesfully'
        }

        return JsonResponse(data)