#!/bin/sh
':' //# http://sambal.org/?p=1014 ; exec /usr/bin/env node --harmony_modules --harmony_regexps --harmony_proxies --harmony_sloppy_function --harmony_sloppy_let --harmony_unicode_regexps --harmony_reflect --harmony_destructuring --harmony_default_parameters --harmony_sharedarraybuffer --harmony_atomics --harmony_simd "$0" "$@"
'use strict';

// a minimal "hello world" express app

console.log('Hello world !');

const _ = require('lodash');
const express = require('express');

const local_ips = require('../../../src/server/common/local-ips').getLocalIps();

const listening_port = 3000;

// http://expressjs.com/4x/api.html
const app = express();

app.get('/', (req, res) => res.send('hello world'));

console.log('(Ctrl+C to stop)');

app.listen(listening_port, () => {
  local_ips.forEach(ip => console.log('Listening on http://' + ip + ':' + listening_port));
});
