'use strict';

console.log('hello world !');

import http from 'http';

import _ from 'lodash';
import express from 'express';
import socketIo from 'socket.io';
import {getLocalIps} from '../common/local-ips';

const listeningPort = (process.env.PORT || 3000);

/////////////////////////////////////////////

import chat_router from './chat';
import api_router from '../../../exercises/nodejs/05-express_routing/api';
import meta_router from '../common/meta-routes';

/////////////////////////////////////////////

// http://expressjs.com/4x/api.html
const app = express();
const server = http.Server(app);

app.use((req, res, next) => {
  console.log(`Request to ${req.url} received at`, Date.now());
  next();
});

app.use(express.static(__dirname + '/../../client'));

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
<li><a>${req.baseUrl}/chat</a>
<li><a>${req.baseUrl}/api</a>
<li><a>${req.baseUrl}/meta</a>

<script>
	document.querySelector('h1').textContent = document.title;
	Array.prototype.forEach.call(document.querySelectorAll('a'), function(el) {
		el.href || (el.href = el.text);
	});
</script>
`));
app.use('/chat', chat_router);
app.use('/api', api_router);
app.use('/meta', meta_router);

console.log('Launching server...');

const io = socketIo(server);
server.listen(listeningPort, () => {
  getLocalIps().forEach(ip => console.log('Listening on http://' + ip + ':' + listeningPort));
});
console.log('(Ctrl+C to stop)');

io.on('connection', function(socket) {
  console.log('a user connected');

  socket.on('disconnect', function() {
    console.log('user disconnected');
  });

  socket.on('chat message', function(msg) {
    console.log('message: ' + msg);
    io.emit('chat message', msg);
  });
});
