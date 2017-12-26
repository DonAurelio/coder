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


class Cafile(object):

    def __init__(self,**kwargs):
        self._rowdim = kwargs.get('rowdim',1000)
        self._coldim = kwargs.get('coldim',1000)
        self._type = kwargs.get('type','int')
        self._generations = kwargs.get('generations',100)
        self._nbhd_name = kwargs.get('nbhd_name','neumann')

    def _get_neigborhood(self):

        neumann = {
                'up':[-1,0],
                'down': [1,0],
                'left': [0,-1],
                'right': [0,1]
        }

        moore = {
                'up_left': [-1,-1],
                'up': [-1,0],
                'up_right': [-1,1],
                'left': [0,-1],
                'right': [0,1],
                'down_left': [1,-1],
                'down': [1,0],
                'down_right': [1,1]
        }

        data = moore if self._nbhd_name == 'moore' \
        else neumann
        
        return data

    @property
    def data(self):
        data = {
            'lattice': {
                'rowdim': self._rowdim,
                'coldim': self._coldim,
                'type': self._type,
                'neighborhood': self._get_neigborhood()
            },
            'generations': self._generations
        }

        return data
