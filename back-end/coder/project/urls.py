from tastypie.api import Api
from project.api.resources import ProjectResource
from project.api.resources import FileResource


api = Api( api_name='editor' )
api.register( ProjectResource() )
api.register( FileResource() )