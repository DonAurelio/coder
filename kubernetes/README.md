# Getting Started with Kubernetes

## Requirements

* [Docker-CE](https://docs.docker.com/install/linux/docker-ce/ubuntu/#supported-storage-drivers) 
* [Minikube](https://kubernetes.io/docs/setup/learning-environment/minikube/)

## Database Deployment

Start the database pod

```sh
kubectl apply -f 1.coder_database_pod.yml
```

## Server Deployment

Deploy a service to make the database reachable by the server pod

```sh
kubectl apply -f 2.coder_database_svc.yml
```

Deploy the replica controller which deals with the **server pod** creation and replication. The server pod comprise nginx, django, pragcc and templates. The nginx serves the django application; django serves as the interface between the database, pragcc and templates containers.

```sh
kubectl apply -f 3.coder_server_rc.yml
```

Deploy a service with load balancing capabilities to point **server pod** replicas when created.

```sh
kubectl  apply -f 4.coder_server_svc.yml
```

Check service and pods are running properly

```sh
kubectl get services,rc,pods


NAME                         TYPE           CLUSTER-IP       EXTERNAL-IP   PORT(S)          AGE
service/coder-database-svc   ClusterIP      10.102.39.159    <none>        5432/TCP         3h42m
service/coder-server-svc     LoadBalancer   10.110.196.167   <pending>     8000:32652/TCP   3h36m

NAME                                    DESIRED   CURRENT   READY   AGE
replicationcontroller/coder-server-rc   1         1         1       140m

NAME                                  READY   STATUS             RESTARTS   AGE
pod/coder-database-pod                1/1     Running            0          143m
pod/coder-server-rc-7qfrc             4/4     Running            0          140m
```

In clase of errors, you can check the log of a containers running in a pod ad follows. In this case **coder-server-rc-7qfrc** is the name of the pod running the **server pod** containers. and django is the name of the container with the logs we are interested.

```sh
kubectl logs coder-server-rc-7qfrc -c django
```

## Scaling Server Pod




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