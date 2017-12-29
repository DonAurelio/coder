from django.db import models
import requests


class Resource(models.Model):
    name = models.CharField(max_length=100)
    base_url = models.URLField()

    def url(self,*args):
        url_parts = [self.base_url,self.name] + list(args)
        return '/'.join(url_parts)

    def check_status(self):
        pass
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