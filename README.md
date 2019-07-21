# Welcome to Coder

**Coder** is a microservices-based online code editor developed to assists the development of C applications that require parallel processing. This tool looks for be extensible by separing the functionalities of a common code editor into services. 

## Available Services

* Coder, deals with C code edition, additionally integrate the services which assist the programmer with code parallelization.

* [Templates](https://github.com/DonAurelio/parallel-templates), some problems in programming follow the same pattern of parallelism. Given the above, it is possible to have templates that allow to address different problems following the same parallelism pattern. If the user have a problem that follows a given parallelism pattern, Templates can provide a basic template to start.

* [Pragcc](https://github.com/DonAurelio/pragcc), it is a tool developed in Python that try assists the process of code parallelization.

## Application Diagram

![alt text](https://github.com/DonAurelio/coder/blob/master/doc/deploy_diagram.png)


## Setting Up 

Install [Docker-CE](https://docs.docker.com/install/linux/docker-ce/ubuntu/#supported-storage-drivers) and [Docker-Compose](https://docs.docker.com/compose/install/#install-compose). Then, placed in the proyect directory, perform the following command.

```sh
docker-compose up -d
```

As the web interface is an Angular applications,i.e, a javascript application running on the client side. We need to tell the client application how to reach the server. The server is running behind an nginx proxy. So we need to know what is the IP address of the nginx proxi so the angular application can communicate with it. Please check the nginx container IP as follows:

```sh 
docker inspect coder_nginx_1 | grep IP

"IPAddress": "172.20.0.3",
```

When you have the nginx ip addres, add a new alias to you /etc/hosts/file.

```sh 
docker inspect coder_nginx_1 | grep IP

172.20.0.3	nginx
```

Unfortunatelly every time you run the container the IP address could change so you will need this steps everytime you restart your containers.

the application will be available at http://localhost:8000

## Further Work

Serveral tools (Parallelizer Compilers, Compiler Directives, Libraries) have been created with the purpose of allowing parallel execution in either CPU or GPU. However, they are not easily accessed by users. This project aims to associate each of them as an application service to assist the parallel programming process.

