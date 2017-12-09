from django.http import JsonResponse
from django.views.generic import TemplateView
import requests


RESOURCE_LOCATION = 'http://localhost:5000/'
RESOURCE = 'template/'
RESOURCE_DETAIL = 'template/%s'


class TemplateList(TemplateView):

    def get(self,request,*args,**kwargs):

        endpoint = RESOURCE_LOCATION + RESOURCE
        response = requests.get(endpoint)

        return JsonResponse(response.json())


class TemplateDetail(TemplateView):

    def get(self,request,*args,**kwargs):

        endpoint = RESOURCE_DETAIL % kwargs['name']
        response = requests.get(endpoint)

        return JsonResponse({'data':'some'})

    def post(self,request,*args,**kwargs):
        pass