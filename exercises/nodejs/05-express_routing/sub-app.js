'use strict';

// http://expressjs.com/4x/api.html#app

const _ = require('lodash');
const express = require('express');


/////////////////////////////////////////////

const app = module.exports = express();

/////////////////////////////////////////////

app.get('/', function(req, res) {
	res.send('hello from sub-app !');
});
