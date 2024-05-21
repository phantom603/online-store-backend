#!/usr/bin/env zx

await $`cd ${__dirname}/common && npm install`;

await Promise.all([
  $`cd ${__dirname}/auth && npm install`,
  $`cd ${__dirname}/api-gateway && npm install`,
  $`cd ${__dirname}/payments && npm install`,
  $`cd ${__dirname}/shop && npm install`,
  $`cd ${__dirname}/dashboard && npm install`,
]);
