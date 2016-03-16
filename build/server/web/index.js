'use strict';

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _localIps = require('../common/local-ips');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// http://expressjs.com/4x/api.html
const app = (0, _express2.default)();

const listeningPort = process.env.PORT || 5000;
app.set('port', listeningPort);

app.use(_express2.default.static(__dirname + '/src/client'));

app.get('/', (req, res) => res.send('hello world'));

_lodash2.default.forEach((0, _localIps.getLocalIps)(), ip => console.log('Listening on http://' + ip + ':' + listeningPort));
console.log('(Ctrl+C to stop)');

app.listen(listeningPort, () => console.log('Node app is running on port', listeningPort));