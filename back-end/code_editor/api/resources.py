from tastypie.resources import ModelResource
from tastypie.resources import ALL_WITH_RELATIONS
from api.models import Project
from api.models import File
from tastypie.authorization import Authorization
from tastypie import fields


class ProjectResource(ModelResource):
    class Meta:
        queryset = Project.objects.all()
        resource_name = 'project'
        authorization = Authorization()
        always_return_data = True
        # fields = ['name']


class FileResource(ModelResource):
    project = fields.ForeignKey(ProjectResource,'project')

    class Meta:
        queryset = File.objects.all()
        resource_name = 'file'
        authorization = Authorization()
        # filtering = {
        #     'user': ALL_WITH_RELATIONS
        # }

