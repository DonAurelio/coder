from django.db import models


class File(models.Model):
    """docstring for File"""

    CAFILE = 'Cafile'
    PARALLEL_FILE = 'Paralell file'
    SOURCE_CODE =' Source code'

    FILE_TYPES = (
        (CAFILE, 'Cafile'),
        (PARALLEL_FILE, 'Parallel file'),
        (SOURCE_CODE, 'Source code')
    )

    # The file name.
    name = models.CharField(max_length=200)
    # File type
    ftype = models.CharField(max_length=100, choices=FILE_TYPES)
    # The file's contents
    text = models.TextField()
    # Each file belong to a specific project
    project = models.ForeignKey('Project')

    def __str__():
        return self.name

        
class Project(models.Model):
    """docstring for Project"""

    # Name for the project
    name = models.CharField(max_length=200)
