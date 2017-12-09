from django.http import JsonResponse
from django.views.generic import TemplateView
from django.views.decorators.csrf import csrf_exempt
from .models import Resource
import requests


class TemplateList(TemplateView):

    def get(self,request,*args,**kwargs):

        resource = Resource.objects.get(name='templates')
        response = requests.get(resource.endpoint_url())

        return JsonResponse(response.json())


class TemplateDetail(TemplateView):

    def get(self,request,*args,**kwargs):

        template_name = kwargs['name']
        resource = Resource.objects.get(name='templates')
        print('endpoint_url',resource.endpoint_url(arg=template_name))
        response = requests.get(resource.endpoint_url(arg=template_name))

        return JsonResponse(response.json())

    @csrf_exempt
    def post(self,request,*args,**kwargs):
        
        return JsonResponse(request.body)