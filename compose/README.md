# Getting Started with Docker Compose

## Requirements

* [Docker-CE](https://docs.docker.com/install/linux/docker-ce/ubuntu/#supported-storage-drivers)
* [Docker-Compose](https://docs.docker.com/compose/install/#install-compose). Perform the following commands from the main project directory.

## Deployment

Start the database

```sh
docker-compose up -d postgres
```

Start the other services client, nginx, server, pragcc, templates in attended mode as follows:

```sh
docker-compose up
```

or as background processes:

```sh
docker-compose up
```

As the web interface is an Angular applications,i.e, a javascript application running on the client side. We need to tell the client application how to reach the server. The server is running behind an nginx proxy. So we need to know what is the IP address of the nginx proxy. So the angular application can communicate with it. Please check the nginx container IP as follows:

```sh 
docker inspect compose_nginx_1 | grep IPAddress

"IPAddress": "172.20.0.3",
```

When you have the nginx ip addres, add a new alias to you */etc/hosts* file as follows

```sh 
sudo nano /etc/hosts

172.20.0.3	coder_server
```

Unfortunatelly every time you run the container the IP address could change, so you need to perform this step everytime contrainers start/restart. The application will be available at http://localhost:8000

To see the running containers use

```sh 
docker-compose ps -a
```

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

The sample database has a defaul user called **coder** with password **coder1234**. To get the django admin interface, you need to get the server container IP address. As the server is behind a nginx proxy serving the static files, whe as docker for the IP of the nginx server. 

```sh 
docker inspect compose_nginx_1 | grep IPAddress

"IPAddress": "172.20.0.5"
```

Then type in the browser the following http://172.20.0.5:8000

## Delete Containers and Images

The following command removes volumes, images and all container's dependencies created with ```docker-compose up```

```sh 
docker-compose down -v --rmi all --remove-orphans
```