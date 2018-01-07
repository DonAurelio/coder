from django.db import models
import requests

# Create your models here.

class Service(models.Model):

    name = models.CharField(max_length=100,primary_key=True,
        help_text='Service name has to be unique')
    base_url = models.CharField(
        help_text='API base url without ending slash')
    description = models.CharField(max_length=400,
        help_text='Describe the service in few words')

    def __str__(self):
        return self.name


class Resource(models.Model):
    # Service who makes the resource available
    service = models.ForeignKey(Service)
    # Resource name
    name = models.CharField(max_length=100,
        help_text='Name of this resouce')
    # An summary about resouce functinality
    description = models.CharField(max_length=400,
        help_text='purpose of this resource')

    class Meta:
        unique_together = (("service", "name"),)

    def url(self,*args):
        url_parts = [self.service.base_url,self.name] + list(args)
        return '/'.join(url_parts)

    def is_available(self):
        message = ''
        try:
            response = requests.get(self.url())
            return True
        except requests.exceptions.ConnectionError as e:
             return False

        return message

    def status(self):
        message = ''
        try:
            response = requests.head(self.url())
            if response.status_code is 200:
                message = 'Online'
            else:
                message = 'Online with erros'

        except requests.exceptions.ConnectionError as e:
             message = 'Offline'

        return message