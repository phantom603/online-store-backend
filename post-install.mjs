#!/usr/bin/env zx

await $`find ${__dirname} -mindepth 2 -maxdepth 2 -name package.json -execdir npm i \\;`;
