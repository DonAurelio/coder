from django.contrib import admin
from .models import Service, Resource


class ServiceAdmin(admin.ModelAdmin):
    fields = ('name','description','base_url')
    search_fields = ('name',)
    list_display= ('name','description','base_url')
admin.site.register(Service,ServiceAdmin)


class ResourceAdmin(admin.ModelAdmin):
    fields = ('service','name','description')
    search_fields = ('name',)
    list_display = ('service','name','description','url','is_available','status')
admin.site.register(Resource,ResourceAdmin)