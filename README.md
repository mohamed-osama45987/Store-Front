# Store Front Api

A project for simple ecommerce api.

## Prerequisite

You need the following modules/dependencies to be installed in order to run the project on your
machine.

```
Nodejs

PostgreSQL

Typescript
```

## Setup enviroment variables

Create a .env file with the following values

```bash
APP_PORT=3000

POSTGRES_HOST='127.0.0.1'

POSTGRES_DB="storefront_dev"

POSTGRES_TEST_DB ="storefront_test"

POSTGRES_USER="postgres"

POSTGRES_PASSWORD="1234"

POSTGRES_PORT=5432

BCRYPT_PASSWORD=your-secret-password

SALT_ROUNDS=10

ENV=dev

JWT_SECRET_KEY="verysecretkeyphrase"

```

## Get started

This will help you to setup a local copy of the project for testing and developing.

Create Postgress Development database

```bash
 sudo su postgres

 psql

 CREATE DATABASE storefront_dev;
```

Create Postgress Testing database

```bash
 sudo su postgres

 psql

 CREATE DATABASE storefront_tests;
```

Clone the project

```bash
  git clone https://github.com/mohamed-osama45987/Store-Front.git
```

Go to the project directory

```bash
  cd STORE-FRONT
```

Migrating database

```bash
  db-migrate up
```

Install dependencies

```bash
  npm install
```

Build the project

```bash
  npm run build
```

Start the server

```bash
  npm run start
```

Running tests

```bash
  npm run test
```

## Tech Stack

**Server:** Node, Express, Typescript, PostgreSQL, JWT

**Testing:** Jasmine, Supertest
