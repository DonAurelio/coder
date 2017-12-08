from django.contrib import admin
from .models import Folder, File

class FolderAdmin(admin.ModelAdmin):
    fields = ('name',)

admin.site.register(Folder, FolderAdmin)

class FileAdmin(admin.ModelAdmin):
    fields = ('name','ftype','text','project')
    
admin.site.register(File, FileAdmin)