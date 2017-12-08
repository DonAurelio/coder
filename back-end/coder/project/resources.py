from tastypie.resources import ModelResource
from project.models import Folder
from project.models import File
from tastypie.authorization import Authorization
from tastypie import fields


class FolderResource(ModelResource):
    class Meta:
        queryset = Folder.objects.all()
        resource_name = 'folder'
        authorization = Authorization()
        always_return_data = True
        limit = 100
        # fields = ['name']


class FileResource(ModelResource):
    project = fields.ForeignKey(FolderResource,'folder')

    class Meta:
        queryset = File.objects.all()
        resource_name = 'file'
        authorization = Authorization()

        # To make search filtering
        filtering = {
            'project': ('exact',)
        }

