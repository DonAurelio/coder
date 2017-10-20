from django.contrib import admin
from .models import Project, File

class ProjectAdmin(admin.ModelAdmin):
    fields = ('name',)

admin.site.register(Project, ProjectAdmin)

class FileAdmin(admin.ModelAdmin):
    fields = ('name','ftype','text','project')
    
admin.site.register(File, FileAdmin)