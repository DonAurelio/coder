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

Check that services and pods are running properly

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

### Scaling Server Pod

Set the **replicas** attribute in the *3.coder-server-rc.yml* file 

```sh
nano 3.coder-server-rc.yml

...
spec:
  replicas: 2
...
```

Apply the changes using


```sh
kubectl apply -f 3.coder_server_rc.yml

replicationcontroller/coder-server-rc configured
```

check that the new pod is running properly. The load balancing is permformed by the **coder-server-service** at *4.coder_server_svc.yml* configured in the previous steps .

```sh
kubectl get pods

NAME                                  READY   STATUS             RESTARTS   AGE
pod/coder-database-pod                1/1     Running            0          143m
pod/coder-server-rc-7qfrc             4/4     Running            4          8h
pod/coder-server-rc-wshvs             4/4     Running            0          2m
```

### Load a Sample Database

To load a sample database you need to get into the server (django application) container.

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


As the web interface is an Angular applications,i.e, a javascript application running on the client side. We need to tell the client application how to reach the server. So the angular application can communicate with it.

```sh
kubectl get services

NAME                         TYPE           CLUSTER-IP       EXTERNAL-IP   PORT(S)          AGE
service/coder-database-svc   ClusterIP      10.102.39.159    <none>        5432/TCP         3h42m
service/coder-server-svc     LoadBalancer   10.110.196.167   <pending>     8000:32652/TCP   3h36m
```

When you have the service ip address, add a new alias to you */etc/hosts* file as follows, indicating where to find the server.

```sh 
sudo nano /etc/hosts

10.110.196.167	coder_server
```

Every time you run the kubernetes the IP address could change, so you need to perform this step everytime kubernetes pods start/restart. The webpage will be available at http://localhost:80
