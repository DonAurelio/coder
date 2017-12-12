from django.db import models
import requests


class Resource(models.Model):
    name = models.CharField(max_length=100)
    url = models.URLField()

    def check_status(self):
        status = ''
        try:
            url = self.url + self.name
            response = requests.head(url)
            code = response.status_code
            status = 'Online' if code is 200 else 'Online with erros'

        except requests.exceptions.ConnectionError as e:
             status = 'Offline'

        return status

    def endpoint_url(self,arg=''):
        args = '' if not arg else '/' + arg
        url = self.url + self.name + args
        return url
