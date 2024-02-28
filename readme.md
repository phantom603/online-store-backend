# Backend for online-store

## Microservices list

- shop
- auth
- payments

---

- api-gateway

## Install

1. Install dependencies in each microservice

```bash
./install.sh
```

2. Add values to .env files in each microservice

## Development

To run all microservices and api-gateway in development mode:

```bash
npm run develop-proxy
```

To run just microservices in development mode:

```bash
npm run develop
```

To run just api-gateway in development mode:

```bash
npm run proxy
```
