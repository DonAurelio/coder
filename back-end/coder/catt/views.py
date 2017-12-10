from django.http import JsonResponse
from django.views.generic import TemplateView
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from .models import Resource
import requests
import json


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

    @exception_handler
    def get(self,request,*args,**kwargs):

        resource = Resource.objects.get(name='templates')
        response = requests.get(resource.endpoint_url())
        data = response.json()
        
        return JsonResponse(data)


class TemplateDetail(TemplateView):

    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):

       return super(TemplateDetail, self).dispatch(request, *args, **kwargs)

    @exception_handler
    def get(self,request,*args,**kwargs):

        template_name = kwargs['name']
        resource = Resource.objects.get(name='templates')
        url = resource.endpoint_url(arg=template_name)
        response = requests.get(url)
        data = response.json()

        return JsonResponse(data)

    @exception_handler
    def post(self,request,*args,**kwargs):

        template_name = kwargs['name']
        data = json.loads(request.body.decode("utf-8"))

        resource = Resource.objects.get(name='templates')
        url = resource.endpoint_url(arg=template_name)
        response = requests.post(url,data=data)
        data = response.json()

        return JsonResponse(data)


