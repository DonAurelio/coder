from django.db import models
import requests

class Resource(models.Model):
    name = models.CharField(max_length=100)
    url = models.URLField()

    def status(self):
        status = ''
        try:
            url = self.url + self.name
            response = requests.get(url)

            if response.status_code is 200:
                status = 'Online'
            else:
                status = 'Online with errors'
        except requests.exceptions.ConnectionError as e:
             status = 'Offline'

        return status