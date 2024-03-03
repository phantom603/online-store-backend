# Backend for online-store

## Microservices list

- shop
- auth
- payments
- api-gateway

## Install

1. Install dependencies in each microservice

```bash
./install.sh
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
./build.sh
```

2. To run all microsercvices via PM2 in **production** mode:

```bash
cd build;
npm start
```
