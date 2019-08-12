# Coder: Microservice Based Online Code Editor Initiative to Assits Parallel Programming

**Coder** is an initiative for a microservices-based online code editor to assists the development of C scientific programs. Code optimization, automatic parallelizers and code analysis tools are the target tools to be integrated on this initiative.
This tool allow extensibility by separing the functionalities of a common code editor into services.

## Intructory Videos

* [Introduction](https://www.youtube.com/watch?v=0I5hRkwDllk&t=8s)
* [How does it works ?](https://www.youtube.com/watch?v=ixcd9PUuE3I)

## Available Services

The follwoing services were developed to test Coder basic funtionalities. However, it is expected to integrate proper code optimization tools or extend the existing ones.

* Coder: Deals with C code edition, additionally integrate the services which assist the programmer with code optimization and parallelization.
* [Templates](https://github.com/DonAurelio/parallel-templates): Provide C templates to start a parallel programming proyect.
* [Pragcc](https://github.com/DonAurelio/pragcc): Provides an basic parallelization method as a source to source compiler.

## Application Diagram

![alt text](https://github.com/DonAurelio/coder/blob/master/doc/deploy_diagram.png)

## Deployments 

* [Docker Compose](https://github.com/DonAurelio/coder/tree/master/compose) 
* [Kubernetes](https://github.com/DonAurelio/coder/tree/master/kubernetes)

## Further Work

Serveral tools (Parallelizer Compilers, Compiler Directives, Libraries) have been created with the purpose of allowing parallel execution in either CPU or GPU. However, they are not easily accessed by users. This project aims to associate each of them as an application service to assist the parallel programming process.

