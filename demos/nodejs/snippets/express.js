
const express = require('express');

// http://expressjs.com/4x/api.html
const app = express();

app.get('/', (req, res) => res.send('hello world'));

app.listen(8080);
console.log('Listening on 8080...');
