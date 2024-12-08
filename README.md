# Volunteering app REST API
## Description

Volunteering app API - backend part of an application written on TypeScript using Nest.js framework.

## Getting started

### Prerequisites
  * yarn `npm i -g yarn` or `corepack enable`
  * Running servers:
    * PostgreSQL
    * Redis

> [!IMPORTANT]
> **Node.js 18.x+** version must be installed in your OS.

### Installation

1. Clone repository
```bash
$ git clone https://github.com/stbestichhh/volunteering-app-api.git
```

2. Install dependencies
```bash
$ yarn install
```

### Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn run start:dev

# production mode
$ yarn build
$ yarn start:prod
```

### Deploy with Docker
```bash
$ docker compose up
```

### Environment variables
Depending on which mode app is running you need `.production.env` or `.development.env` and basic `.env` for docker compose
Application vars:
  * PORT
  * HOST
  * PUBLIC_CERTIFICATE_PATH - path to the certificate to run app in https mode
  * PRIVATE_KEY_PATH - path to the private key for https mode
  * SESSION_SECRET - session secret string for auth sessions
  * SESSION_MAX_AGE - hours for auth session to live
  * POSTGRES_HOST
  * POSTGRES_PORT
  * POSTGRES_USER
  * POSTGRES_PASSWORD
  * POSTGRES_DB
  * REDIS_HOST
  * REDIS_PORT
  * REDIS_PASSWORD

Docker compose vars:
  * PORT - application port
  * POSTGRES_HOST
  * POSTGRES_PORT
  * POSTGRES_USER
  * POSTGRES_PASSWORD
  * POSTGRES_DB
  * REDIS_PORT
  * REDIS_PASSWORD


## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Author

- Author - [Kiril Yakymchuk](https://github.com/stbestichhh)

## License

Volunterring app api is licensed under [MIT](LICENSE).
