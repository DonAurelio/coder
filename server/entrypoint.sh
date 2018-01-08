#!/bin/sh

./manage.py makemigrations --noinput --merge

./manage.py migrate --noinput

./manage.py collectstatic --noinput

gunicorn coder.wsgi -b 0.0.0.0:80
