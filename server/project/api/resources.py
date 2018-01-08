from tastypie import authorization
from tastypie import resources
from tastypie import fields
from project import models


class ProjectResource(resources.ModelResource):
    class Meta:
        queryset = models.Project.objects.all()
        resource_name = 'projects'
        authorization = authorization.Authorization()
        always_return_data = True
        limit = 100
        # fields = ['name']


class FileResource(resources.ModelResource):
    project = fields.ForeignKey(ProjectResource,'project')

    class Meta:
        queryset = models.File.objects.all()
        resource_name = 'files'
        authorization = authorization.Authorization()

        # To make search filtering
        filtering = {
            'project': ('exact',)
        }

