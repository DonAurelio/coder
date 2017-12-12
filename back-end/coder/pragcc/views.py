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
        return super(OpenMP, self).dispatch(request, *args, **kwargs)

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
        file_obj = project.models.File.objects.get(id=file_id)

        ftype = file_obj.ftype
        name = file_obj.name

        # Checking if the file can be parrallelized
        is_a_cfile = '.c' in name and 'c99' in ftype
        was_parrallelized = 'omp_' in name or 'acc_' in name

        data = {}
        if is_a_cfile and not was_parrallelized:

            file_obj = project.models.File(
                project=file_obj.project,
                name='omp_file.c',
                ftype='c99',
                text='Some test !!!!'
            )
            file_obj.save()

            data['message'] = "The file '%s' \
            was parallelized succesfully" % name

        else:
            data['message'] = "The file '%s' can't be parallelized \
            probably it is not a c99 source code or it was already \
            parallelized." % name   


        return JsonResponse(data)