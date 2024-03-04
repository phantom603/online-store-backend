#!/usr/bin/env bash

rm -rf build;
find . -maxdepth 2 -mindepth 2 -name package.json -execdir npm run build \;
mkdir -p build;
cp ecosystem.config.js build;
cp package.json package-lock.json build;
cd build && npm i --omit=dev && cd ../;

# copy all common module with package.json
cp -vr common build/common;
cp -vr auth/build build/auth && cd build/auth  && npm ci --omit=dev && cd ../..;
cp -vr shop/build build/shop && cd build/shop && npm ci --omit=dev && cd ../..;
cp -vr payments/build build/payments && cd build/payments && npm ci --omit=dev && cd ../..;
cp -vr api-gateway/build build/api-gateway && cd build/api-gateway && npm ci --omit=dev && cd ../..;
