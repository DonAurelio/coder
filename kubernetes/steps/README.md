# Getting Started with Kubernetes

## Requirements

* [Docker-CE](https://docs.docker.com/install/linux/docker-ce/ubuntu/#supported-storage-drivers) 
* [Minikube](https://kubernetes.io/docs/setup/learning-environment/minikube/)

## Database Deployment

Start the database pod

```sh
kubectl apply -f 1.coder_database_pod.yml
```

Deploy a service to make the database reachable by the server pod

```sh
kubectl apply -f 2.coder_database_svc.yml
```

## Create the Server Pod

Deploy a replica controller which deals with the **server pod** creation and replication. The server pod comprise nginx, django, pragcc and templates services. 

* **nginx** serves the django application
* **django** serves as the interface between the database, **pragcc** and **templates**.

```sh
kubectl apply -f 3.coder_server_rc.yml
```

## Create a Service for Server Pod

Deploy a load balancing service to point **server pod** replicas when created. This load balancing service will map **server pods** with the port 30000 of the host (kubernetes node). Then you will be able to access the application from outside.

```sh
kubectl  apply -f 4.coder_server_svc.yml
```

Check that the services and pods are running properly

```sh
kubectl get services,rc,pods

NAME                         TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)          AGE
service/coder-database-svc   ClusterIP   10.109.80.122   <none>        5432/TCP         80m
service/coder-server-svc     NodePort    10.109.11.88    <none>        8000:30000/TCP   80m

NAME                                    DESIRED   CURRENT   READY   AGE
replicationcontroller/coder-server-rc   2         2         2       80m

NAME                        READY   STATUS    RESTARTS   AGE
pod/coder-database-pod      1/1     Running   0          81m
pod/coder-server-rc-27rcv   4/4     Running   0          80m
pod/coder-server-rc-xjsck   4/4     Running   0          80m
```

In clase of errors, you can check the log of a containers running in a pod as shown below. In this case **coder-server-rc-27rcv**. And django is the name of the container which the logs we are looking for.

```sh
kubectl logs coder-server-rc-xjsck -c django
```

### Scaling Server Pod

Set the **replicas** attribute in the *3.coder-server-rc.yml* file 

```sh
nano 3.coder-server-rc.yml

...
spec:
  replicas: 2
...
```

Apply the changes


```sh
kubectl apply -f 3.coder_server_rc.yml

replicationcontroller/coder-server-rc configured
```

Check that the new pod is running properly. The load balancing is permformed automatically by the **coder-server-service** at *4.coder_server_svc.yml* configured in the previous steps.

```sh
kubectl get pods

NAME                    READY   STATUS    RESTARTS   AGE
coder-database-pod      1/1     Running   0          83m
coder-server-rc-27rcv   4/4     Running   0          82m
coder-server-rc-xjsck   4/4     Running   0          82m
```

### Load a Sample Database

To load a sample database you need to get into the django container running in the server pod. You can choose between *coder-server-rc-wshvs* or *coder-server-rc-7qfrc* because both pod's containers are connected to the same database.

```sh 
kubectl exec -it coder-server-rc-7qfrc -c django -- sh
```

You will be login into the django server. Perform the following command to load the database data.

```sh 
./manage.py loaddata sampledb-compose.json 

Installed 11 object(s) from 1 fixture(s)
```

### Access Django Admin deployed in the Server

The sample database has a default user called **coder** with password **coder1234**. To access the server you can user the **coder-server-service (coder-server-svc)** kubernetes interface.

```sh
kubectl get services

NAME                         TYPE           CLUSTER-IP       EXTERNAL-IP   PORT(S)          AGE
service/coder-database-svc   ClusterIP      10.102.39.159    <none>        5432/TCP         3h42m
service/coder-server-svc     LoadBalancer   10.110.196.167   <pending>     8000:32652/TCP   3h36m
```

Use the following link http://10.110.196.167:8000

## Deploy the Web Interface


The client side is an Angular 4 applications,i.e., a javascript application inteded to run on the client side. Use the following command to run the client pod application.


```sh
kubectl  apply -f 5.coder_webapp_pod.yml
```

Then, we need to tell the client application how to reach the server. The **server pod** is running behind the kubernetes service contruct called **coder-server-svc**.

```sh
kubectl get services

NAME                         TYPE           CLUSTER-IP       EXTERNAL-IP   PORT(S)          AGE
service/coder-database-svc   ClusterIP      10.102.39.159    <none>        5432/TCP         3h42m
service/coder-server-svc     LoadBalancer   10.110.196.167   <pending>     8000:32652/TCP   3h36m
```

When you have the service ip address, add a new alias to your */etc/hosts* file as follows, indicating where to find the server.

```sh 
sudo nano /etc/hosts

10.110.196.167	coder_server
```

Every time you run the kubernetes the IP address could change, so you need to perform this step every kubernetes's pods start/restart. 

The client side web page will be available at http://localhost:80
