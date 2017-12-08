from django.db import models


class File(models.Model):
    """docstring for File"""

    C = 'c99'
    YML = 'yml'

    FILE_TYPES = (
        (C, 'c99'),
        (YML, 'yml')
    )

    # The file name.
    name = models.CharField(max_length=200)
    # File type
    ftype = models.CharField(max_length=100, choices=FILE_TYPES)
    # The file's contents
    text = models.TextField(null=True,blank=True)
    # Each file belong to a folder
    project = models.ForeignKey('Folder')

    def __str__(self):
        return self.name

        
class Folder(models.Model):
    """docstring for Project"""

    # Name for the project
    name = models.CharField(max_length=200)
    # Project created date
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

    def __unicode__(self):
        return self.name