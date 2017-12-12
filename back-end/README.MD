# Deployment with Docker

Perform the following commands to build the **catt** image, then to run the **catt** API in a container. These command need to be 
performed form the catt project root directory.

```sh
docker build -t coder-back .
docker run -d -v ${PWD}:/usr/src/app --name  coder-back -p 8000:8000  coder-back
```

# Requirements for the back-end

* [django-cors-headers](https://github.com/ottoyiu/django-cors-headers)

* [always_return_data](http://django-tastypie.readthedocs.io/en/latest/resources.html#always-return-data)