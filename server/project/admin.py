from django.contrib import admin
from .models import Project, File

class ProjectAdmin(admin.ModelAdmin):
    fields = ('name','description','base_template')
    list_display = ('name','description','base_template')

admin.site.register(Project, ProjectAdmin)

class FileAdmin(admin.ModelAdmin):
    fields = ('name','ftype','text','project')
    list_display = ('id','project_id','name','ftype')
    
admin.site.register(File, FileAdmin)