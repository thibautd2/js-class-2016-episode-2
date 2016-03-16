
import _ from 'lodash';
import express from 'express';
import {get_local_ips as getLocalIps} from '../common/local-ips';

// http://expressjs.com/4x/api.html
const app = express();

const listeningPort = (process.env.PORT || 5000);
app.set('port', listeningPort);

app.use(express.static(__dirname + '/src/client'));

app.get('/', (req, res) => res.send('hello world'));

_.forEach(getLocalIps(), ip => console.log('Listening on http://' + ip + ':' + listeningPort));
console.log('(Ctrl+C to stop)');

app.listen(listeningPort, () => console.log('Node app is running on port', listeningPort));
