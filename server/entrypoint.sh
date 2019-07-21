#!/bin/sh

./manage.py makemigrations --noinput --merge

./manage.py migrate --noinput

./manage.py collectstatic --noinput

# Initial db data
./manage.py loaddata prod-db.json

gunicorn coder.wsgi --timeout 600 -b 0.0.0.0:8001

# ./manage.py runserver 0.0.0.0:80