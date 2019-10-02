# Getting Started with Docker Compose

## Requirements

* [Docker-CE](https://docs.docker.com/install/linux/docker-ce/ubuntu/#supported-storage-drivers)
* [Docker-Compose](https://docs.docker.com/compose/install/#install-compose)

## Deployment

Start the database

```sh
docker-compose up -d postgres
```

Start the other services client, nginx, server, pragcc, templates in attended mode (for debuging) as follows:

```sh
docker-compose up
```

or as background processes:

```sh
docker-compose up -d 
```

As the web interface is an Angular 4 applications,i.e, a javascript application running on the client side. We need to tell the client application how to reach the server. The server IP address can be obtained as follows:

```sh 
docker inspect compose_nginx_1 | grep IPAddress

"IPAddress": "172.20.0.3",
```

When you have the nginx IP address, add a new alias to you */etc/hosts* file as called coder_server. Then, the Angular 4 web application will be enabled to reach the server.

```sh 
sudo nano /etc/hosts

172.20.0.3	coder_server
```

Unfortunatelly every time you start/restart the nginx container, the IP address could change, so you need to perform this step for every container start/restart. 

Finally, the application will be available at http://localhost:8000

## Load a Sample Database

To load a sample database you need to get into the server (django application) container.

```sh 
docker exec -it compose_server_1 sh
```

You will be login into the django server. Perform the following command to load the database data.


```sh 
./manage.py loaddata sampledb-compose.json 

Installed 11 object(s) from 1 fixture(s)
```

## Access Django Admin

The sample database has a defaul user called **coder** with password **coder1234**. 
To get the django admin interface, you need to obtain the server container IP address. 
As the server is behind a nginx proxy serving the static files and server API,
the most appropriate is to access through the proxy server.

```sh 
docker inspect compose_nginx_1 | grep IPAddress

"IPAddress": "172.20.0.5"
```

Use the following URL to acces the Django Admin Interface http://172.20.0.5:8000

## Delete Containers and Images

The following command removes volumes, images and all container's dependencies created with ```docker-compose up```

```sh 
docker-compose down -v --rmi all --remove-orphans
```
