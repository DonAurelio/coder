from django.db import models


class File(models.Model):

    C = 'c99'
    YML = 'yml'

    FILE_TYPES = (
        (C, 'c99'),
        (YML, 'yml')
    )

    # project to which this file belongs
    project = models.ForeignKey('Project')
    # File name
    name = models.CharField(max_length=200)
    # File type
    ftype = models.CharField(max_length=100, choices=FILE_TYPES)
    # File contents
    text = models.TextField(null=True,blank=True)

    class Meta:
        # File name inside a project must be unique
        unique_together = (("project", "name"),)

    @property
    def is_compilable(self):
        is_a_cfile = '.c' in self.name and 'c99' in self.ftype
        return is_a_cfile
        
    @property
    def is_parallelizable(self):
        is_a_cfile = '.c' in self.name and 'c99' in self.ftype
        was_parrallelized = 'omp' in self.name or 'acc' in self.name

        return is_a_cfile and not was_parrallelized

    def __str__(self):
        return self.name

    def __unicode__(self):
        return self.name

        
class Project(models.Model):
    # Project name must be unique
    name = models.CharField(max_length=200, unique=True)
    # A brew descition of the project
    description = models.TextField(null=True,blank=True)
    # The CA template from which this project was created
    base_template = models.CharField(max_length=200)
    # Date at which this project was created
    created_at = models.DateTimeField(auto_now_add=True)

    def get_file(self,name):
        """Returns a fila object with the given name."""
        try:
            file = self.file_set.get(name=name)
            return file
        except File.DoesNotExist:
            file = None

        return file

    def __str__(self):
        return self.name

    def __unicode__(self):
        return self.name