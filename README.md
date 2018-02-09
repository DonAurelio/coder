# Welcome to Coder A microservice WEB based code editor for parallel programming

**Coder** is a microservices-based online code editor developed to assists the development of C applications that require parallel processing. This tool looks for be extensible by separing the functionalities of a common code editor into services. 

## Available Services

* Coder, deals with C code edition, additionally integrate the services which assist the programmer with code parallelization.

* [Templates](https://github.com/DonAurelio/parallel-templates), some problems in programming follow the same pattern of parallelism, given the above it is possible to have templates that allow to address different problems that follow the same pattern. if the user looks for code a problem that follows a pattern of parallelism, Templates can provide a basic template to start.

* [Pragcc](https://github.com/DonAurelio/pragcc), it is a tool developed in Python that try assists the process of code parallelization.


## Further Work

Serveral tools (Parallelizer Compilers, Compiler Directives, Libraries) have been created with the purpose of allowing parallel execution in either CPU or GPU. However, these tools are not easy to acces by the user. This project aims to associate each of these tools as an application service to assist the parallel programming process.

## Deploying

Install [Docker-CE](https://docs.docker.com/install/linux/docker-ce/ubuntu/#supported-storage-drivers) and [Docker-Compose](https://docs.docker.com/compose/install/#install-compose). Then, placed in the proyect directory, perform the following command.

```sh
docker-compose up -d
```
