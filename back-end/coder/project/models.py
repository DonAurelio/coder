from django.db import models


class File(models.Model):

    C = 'c99'
    YML = 'yml'

    FILE_TYPES = (
        (C, 'c99'),
        (YML, 'yml')
    )

    project = models.ForeignKey('Project')
    name = models.CharField(max_length=200)
    ftype = models.CharField(max_length=100, choices=FILE_TYPES)
    text = models.TextField(null=True,blank=True)
    

    def __str__(self):
        return self.name

        
class Project(models.Model):

    name = models.CharField(max_length=200)
    description = models.TextField(null=True,blank=True)
    base_template = models.CharField(max_length=200)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

    def __unicode__(self):
        return self.name