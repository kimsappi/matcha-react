const socket = require('socket.io');

const wsServerInit = server => {
	const io = socket(server);

	io.on('connection', function(socket) {
		socket.on('chat', function(jees) {
		  io.emit('chat', jees);
		  console.log("asd");
		  console.log(jees);
		  console.log(socket.id + '###');
		})
		console.log("jees");
		console.log(socket.id);
	});
};

module.exports = wsServerInit;
