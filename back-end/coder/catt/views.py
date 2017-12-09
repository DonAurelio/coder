from django.http import JsonResponse
from django.views.generic import TemplateView
import requests




CATT_RESOURCE_LOCATION = 'http://localhost:5000/'
TEMPLATE_RESOURCE = 'template/'


class TemplateList(TemplateView):

	def get(self,request,*args,**kwargs):

		endpoint = CATT_RESOURCE_LOCATION + TEMPLATE_RESOURCE
		response = requests.get(endpoint)

		return JsonResponse({'data':response.json()})
