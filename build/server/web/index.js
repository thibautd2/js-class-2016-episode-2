'use strict';

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _socket = require('socket.io');

var _socket2 = _interopRequireDefault(_socket);

var _localIps = require('../common/local-ips');

var _chat = require('./chat');

var _chat2 = _interopRequireDefault(_chat);

var _api = require('../../../exercises/nodejs/05-express_routing/api');

var _api2 = _interopRequireDefault(_api);

var _metaRoutes = require('../common/meta-routes');

var _metaRoutes2 = _interopRequireDefault(_metaRoutes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.log('hello world !');

const listeningPort = process.env.PORT || 3000;

/////////////////////////////////////////////

/////////////////////////////////////////////

// http://expressjs.com/4x/api.html
const app = (0, _express2.default)();
const server = _http2.default.Server(app);

app.use((req, res, next) => {
	console.log(`Request to ${ req.url } received at`, Date.now());
	next();
});

app.use(_express2.default.static(__dirname + '/../../client'));

app.get('/', (req, res) => res.send(`
<!DOCTYPE html>
<head>
	<title>Node.js server</title>
	<style type="text/css">
		body {
			margin: 40px;
			font-family: "Lucida Sans Unicode", "Lucida Grande", sans-serif;
			color: #333;
		}
	</style>
</head>

<h1>...</h1>
<li><a>${ req.baseUrl }/chat</a>
<li><a>${ req.baseUrl }/api</a>
<li><a>${ req.baseUrl }/meta</a>

<script>
	document.querySelector('h1').textContent = document.title;
	Array.prototype.forEach.call(document.querySelectorAll('a'), function(el) {
		el.href || (el.href = el.text);
	});
</script>
`));
app.use('/chat', _chat2.default);
app.use('/api', _api2.default);
app.use('/meta', _metaRoutes2.default);

console.log('Launching server...');

const io = (0, _socket2.default)(server);
server.listen(listeningPort, () => {
	(0, _localIps.getLocalIps)().forEach(ip => console.log('Listening on http://' + ip + ':' + listeningPort));
});
console.log('(Ctrl+C to stop)');

io.on('connection', function (socket) {
	console.log('a user connected');

	socket.on('disconnect', function () {
		console.log('user disconnected');
	});

	socket.on('chat message', function (msg) {
		console.log('message: ' + msg);
		io.emit('chat message', msg);
	});
});