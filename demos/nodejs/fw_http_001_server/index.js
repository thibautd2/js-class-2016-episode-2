#!/bin/sh
':' //# http://sambal.org/?p=1014 ; exec /usr/bin/env node --harmony_modules --harmony_regexps --harmony_proxies --harmony_sloppy_function --harmony_sloppy_let --harmony_unicode_regexps --harmony_reflect --harmony_destructuring --harmony_default_parameters --harmony_sharedarraybuffer --harmony_atomics --harmony_simd "$0" "$@"
'use strict';

// http://fr.openclassrooms.com/informatique/cours/des-applications-ultra-rapides-avec-node-js/construire-son-serveur-http

const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200);
  res.end('Hello world !');
});

server.listen(8080);
console.log('Listening on 8080...');
