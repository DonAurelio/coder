# Base image
FROM python:3.5-alpine
# Image propietary
LABEL maintainer="Aurelio Vivas aurelio.vivas@correounivalle.edu.co"
# Working directory inside the container
WORKDIR /usr/src/app
# Copy the project into the container current workdir
COPY . .

# Requirement for psycopg2-binary
RUN \
 apk add --no-cache postgresql-libs && \
 apk add --no-cache --virtual .build-deps gcc musl-dev postgresql-dev

# Installing requirements
RUN pip3 install --no-cache-dir -r ./requirements.txt

# ENV SECRET_KEY '0p6cu%4z8!=tlrhl#ssy8ox)$#aaq8n4x%wu9g0xcd-w$01&9+'

# Informs Docker that the container listens on the specified network ports at runtime
# The EXPOSE instruction does not actually publish the port. It functions as a type of 
# documentation between the person who builds the image and the person who runs the container, 
# about which ports are intended to be published. To actually publish the port when running 
# the container, use the -p flag on docker run to publish and map one or more ports, or the -P 
# flag to publish all exposed ports and map them to to high-order ports.
EXPOSE 8001

# Entrypoint
CMD ["/bin/sh", "entrypoint.sh"]