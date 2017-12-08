from tastypie.api import Api
from project.resources import ProjectResource
from project.resources import FileResource

api = Api( api_name='project' )
api.register( ProjectResource() )
api.register( FileResource() )