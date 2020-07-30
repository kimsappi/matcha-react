const http = require('http');

const ws = require('ws');

const app = require('../app');

const wsServer = http.createServer();
const socketServer = new ws.Server({server: wsServer});

wsServer.on('request', app);
socketServer.on('connection', socket => {
  socket.on('message', message => console.log(message));
  socket.send(JSON.stringify('response'));
  setInterval(() => {
    socket.send(JSON.stringify('5 seconds'));
  }, 5000);
});

module.exports = {
	wsServer,
	socketServer
};
