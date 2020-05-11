# Rent Bike App

## 1. Start app manual

## 1.1 Docker

Rename example.env to .env.

```sh
$ mv example.env .env
```

Build and up with Docker

```sh
$ docker-compose build
$ docker-compose up
```

Go to:

```sh
http://localhost:4000/
```

## 1.2 Local

\*Warning: seed and migration commands use for work linux syntax: \$(cat .env | xargs)

Rename example.env to .env.
Set your .env postgres fields:

- POSTGRES_PASSWORD=
- POSTGRES_USER=
- POSTGRES_DB=
- PG_HOST=

Probably set instead PG_HOST=db ---> PG_HOST=localhost

Run command:

```sh
$ npm run local:prod
```

Go to:

```sh
http://localhost:4000/
```

## 2. Documentation

All API Doc you can get postman link:
https://documenter.getpostman.com/view/7503052/Szmh1c3P
