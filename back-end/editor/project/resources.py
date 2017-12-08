from tastypie.resources import ModelResource
from project.models import Project
from project.models import File
from tastypie.authorization import Authorization
from tastypie import fields


class ProjectResource(ModelResource):
    class Meta:
        queryset = Project.objects.all()
        resource_name = 'project'
        authorization = Authorization()
        always_return_data = True
        limit = 100
        # fields = ['name']


class FileResource(ModelResource):
    project = fields.ForeignKey(ProjectResource,'project')

    class Meta:
        queryset = File.objects.all()
        resource_name = 'file'
        authorization = Authorization()

        # To make search filtering
        filtering = {
            'project': ('exact',)
        }

