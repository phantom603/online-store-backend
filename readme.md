# Backend for online-store

[![Test Coverage](https://api.codeclimate.com/v1/badges/edf6c50239f33450ba88/test_coverage)](https://codeclimate.com/github/dosandk/online-store-backend/test_coverage)

## Microservices list

- shop
- auth
- payments
- api-gateway

## Install

1. Install dependencies in root project and each microservice:

```bash
npm install
```

2. Add values to .env files in each microservice

## Development mode

To run all microservices with api-gateway via PM2 in **development** mode:

```bash
npm start
```

## Production mode

1. To build all microservices:

```bash
npm run build
```

2. To run all microsercvices via PM2 in **production** mode:

```bash
cd build;
npm start
```
