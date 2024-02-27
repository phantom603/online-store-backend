#!/usr/bin/env bash

find . -maxdepth 2 -name package.json -execdir npm i \;
