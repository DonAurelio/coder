# Coder: Microservice Based Online Code Editor Initiative to Support Parallel Programming

**Coder** is an initiative for a microservices-based online code editor to assist the development of C scientific applications. Code optimization, automatic parallelizers and code analysis are the target tools to be integrated on this initiative.
This tool allow extensibility by providing these tools as services.

## Intructory Videos

* [Introduction](https://www.youtube.com/watch?v=0I5hRkwDllk&t=8s)
* [Demo](https://www.youtube.com/watch?v=ixcd9PUuE3I)

## Available Services

The follwoing services were developed to test Coder basic funtionalities. However, it is expected to integrate proper code optimization tools or extend the existing ones.

* Coder: Deals with C code edition, additionally integrate the services which assist the programmer with code optimization and parallelization.
* [Templates](https://github.com/DonAurelio/parallel-templates): Provide C templates to start a parallel programming proyect.
* [Pragcc](https://github.com/DonAurelio/pragcc): Provides an basic parallelization method as a source to source compiler.

## Application Diagram

![alt text](https://github.com/DonAurelio/coder/blob/master/doc/deploy_diagram.png)

## Deployment

* [Docker Compose](https://github.com/DonAurelio/coder/tree/master/compose) 
* [Kubernetes](https://github.com/DonAurelio/coder/tree/master/kubernetes)


## Server Endpoints

### Projects

List available projects

`GET http://<server-ip>:<server-port>/api/project/projects/`

Get project with specific id. 

`GET http://<server-ip>:<server-port>/api/project/projects/<project-id>/`

### Files

List available files

`GET http://<server-ip>:<server-port>/api/project/files/`

Get files belonging to a project with specific id.

`GET http://<server-ip>:<server-port>/api/project/files?project=<project-id>`

### Pragcc Service

The pragcc service perform C99 source code compilation and parallelization with OpenMP or OpenACC Directives.

Compile a file

`POST http://<server-ip>:<server-port>/api/pragcc/compiler/compile/files/<file-id>`

Annotate code with OpenMP directives, the file with the given id must be C99 source code.

`POST http://<server-ip>:<server-port>/api/pragcc/openmp/parallelize/files/<file-id>`

Annotate code with OpenACC directives, the file with the given id must be C99 source code.

`POST http://<server-ip>:<server-port>/api/pragcc/openacc/parallelize/files/<file-id>`


## Further Work

Serveral tools (Parallelizer Compilers, Compiler Directives, Libraries) have been created with the purpose of allowing parallel execution in either CPU or GPU. However, they are not easily accessed by users. This project aims to associate each of them as an application service to assist the parallel programming process.

