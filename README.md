# Welcome to Coder

**Coder** is a REST API made with Django 1.11.7 and Tastypie intended to be an **online code editor**. This tool tries to be extensible by separing the functionalities of a common code editor into services. The main service of this application is called **editor**, which allows the creation of projects, as well as the creation of files of the same. The **editor** service exposes the following endpoints to interact with.

| HTTP Method | URI | Action |
|---|---|---|
| GET | http://[hostname]/api/editor/projects | Retrieve a list of projects |
| GET | http://[hostname]/api/editor/projects/[project_id] | Retrieve a project |
| POST | http://[hostname]/api/editor/projects | Create a new project |
| PUT | http://[hostname]/api/editor/projects/[project_id] | Update an existing project |
| DELETE | http://[hostname]/api/editor/projects/[project_id] | Delete a project |


# Further Work

To fulfill other purposes, two additional services have been added. The **catt** and **pragcc** services. The idea of the first service is to provide templates of C99 code that can be easily parallelizable; The second one is a kind of annotator, which writes down a C99 code with OpenMP and OpenACC compiler directives. You can play with these services through the following API end-points.


# Catt Service

| HTTP Method | URI | Action |
|---|---|---|
| GET | http://[hostname]/api/catt/templates | Retrieve a list of templates for parallel programming |
| GET | http://[hostname]/api/catt/templates/[template_name] | Retrieve a template detail |
| POST | http://[hostname]/api/catt/templates | Create a new cellular automata project |

# Pragcc Service

| HTTP Method | URI | Action |
|---|---|---|
| POST | http://[hostname]/api/pragcc/openmp/parallelize/files/[file_id] | Create a parallelized version of the file with **id** equal to **file_id** and includes the parallelized version in the same project of the original file |
| POST | http://[hostname]/api/pragcc/compiler/compile/files/[file_id] | Chechk if the file with id file_id can be compiled successfully |


# Deployment with Docker

Perform the following commands to build the **catt** image, then to run the **catt** API in a container. These command need to be 
performed form the catt project root directory.

```sh
docker build -t coder-back .
docker run -d -v ${PWD}:/usr/src/app --name  coder-back -p 8000:8000  coder-back
```

# Requirements for the back-end

* [django-cors-headers](https://github.com/ottoyiu/django-cors-headers)

* [always_return_data](http://django-tastypie.readthedocs.io/en/latest/resources.html#always-return-data)