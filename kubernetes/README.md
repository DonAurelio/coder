# Getting Started with Kubernetes

## Requirements

* [Docker-CE](https://docs.docker.com/install/linux/docker-ce/ubuntu/#supported-storage-drivers) 
* [Minikube](https://kubernetes.io/docs/setup/learning-environment/minikube/)

## Deployment

Start the database pod

```sh
kubectl apply -f coder.yml
```

## Check Pods and Services

```sh 
kubectl get services,pods

NAME                         TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)          AGE
service/coder-database-svc   ClusterIP   10.102.71.253   <none>        5432/TCP         29m
service/coder-server-svc     NodePort    10.101.69.99    <none>        8000:30000/TCP   7s
service/kubernetes           ClusterIP   10.96.0.1       <none>        443/TCP          60m

NAME                        READY   STATUS    RESTARTS   AGE
pod/coder-database-pod      1/1     Running   1          29m
pod/coder-server-rc-7c22x   4/4     Running   4          29m
pod/coder-server-rc-9svfr   4/4     Running   4          29m
pod/coder-webapp-pod        1/1     Running   1          29m

```

The line containing **service/coder-server-svc** describe where will be available the load balancing endpoint to be redirected to any pod (Replica 1 or 2). We will be able to acces the server in `10.101.69.99:8000` locally (our computer). For outside we have to use `<computer-ip>:30000`. If you are running minikube in a virtual machine, then you require to use `<virtual-machine-ip>:30000` then, the application will no be available from outside

```sh
NAME                         TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)          AGE
service/coder-server-svc     NodePort    10.101.69.99    <none>        8000:30000/TCP   7s
```

## Load Sample Database

To load a sample database you need to get into the django container running in the server pod. You can choose between *coder-server-rc-7c22x* or *oder-server-rc-9svfr* as both pod's containers are connected to the same database.

```sh 
kubectl exec -it coder-server-rc-7c22x -c django -- sh
```

You will be login into the django server. Perform the following command to load the database data.

```sh 
./manage.py loaddata sampledb-compose.json 

Installed 11 object(s) from 1 fixture(s)
```

## Access Django Admin deployed in the Server

The sample database has a default user called **coder** with password **coder1234**.

```sh
kubectl get services

NAME                 TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)          AGE
coder-database-svc   ClusterIP   10.102.71.253   <none>        5432/TCP         42m
coder-server-svc     NodePort    10.101.69.99    <none>        8000:30000/TCP   13m
```

The following Use the following link:

* http://10.101.69.99:8000 (locally)
* http://127.0.0.1:8000 (locally)
* http://<virtual-machine-ip>:8000 (work only from host machine)
* http://<computer-ip>:8000 (outside)


## Scaling Server Pod

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
kubectl apply -f coder.yml
```

## Acces the  the Web Interface


The client side is an Angular 4 applications,i.e., a javascript application inteded to run on the client side. We need to tell the client application how to reach the server. The **server pod** is running behind the kubernetes service contruct called **coder-server-svc**.

```sh
kubectl get services

NAME                 TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)          AGE
coder-database-svc   ClusterIP   10.102.71.253   <none>        5432/TCP         42m
coder-server-svc     NodePort    10.101.69.99    <none>        8000:30000/TCP   13m
```

When you have the service ip address, add a new alias to your */etc/hosts* file as follows, indicating where to find the server.

```sh 
sudo nano /etc/hosts

10.101.69.99	coder_server
```

Every time you run the kubernetes the IP address could change, so you need to perform this step every kubernetes's pods start/restart. 

The client side web page will be available at http://localhost:80
