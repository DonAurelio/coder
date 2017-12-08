from tastypie.api import Api
from project.resources import FolderResource
from project.resources import FileResource

api = Api( api_name='project' )
api.register( FolderResource() )
api.register( FileResource() )