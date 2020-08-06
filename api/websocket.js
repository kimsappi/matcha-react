const socket = require('socket.io');

const jwt = require('jsonwebtoken');
const mysql = require('mysql');

const {tokenSecret} = require('./config.json');
const pool = require('./modules/dbConnect');
const { startWatchingDataUpdate } = require('geoip-lite');

function auth(thetoken) {
	console.log("TOKEN:::" + thetoken);
	const authHeader = thetoken;
	const token = authHeader;
	if (!token) 
		return "no token error";

	else {
		jwt.verify(token, tokenSecret, (err, user) => {
			console.log("ennen");
			console.log(user);
			console.log("jalkeen");
			return user;

			if (err) 
				return "jwt error";
			else {
				console.log('querying online status');
				pool.query(mysql.format('SELECT `online` FROM users WHERE id = ? AND login_id = ?;', [user.id, user.login_id]), (error, results) => {
					if (error || !results[0] || !results[0].online)
						return res.json('logged out');
					else {
						return user;
					}
				})
			}
		});
	}
}


const wsServerInit = server => {

	const io = socket(server);
	var testii = 1;
	const keys = [];
	
	io.on('connection', function(socket) {

		socket.on('privateChat', function(data) {
			var temp;
			jwt.verify(data.me, tokenSecret, (err, user) => {

				if (err)
				console.log("ERRRRORRRR");
				else
					temp = user;
			});

			keys[temp.id] = socket.id;


			console.log(data);
			console.log("PRIVATE ROOM CREATED");


			console.log("ARRAY: " + keys);

			socket.join(keys[data.user]);
	
		})


		socket.on('chat', function(jees) {

		
		io.sockets.in(keys[jees.id]).emit('chat', {message: jees.msg});

		//io.emit('chat', {okei: 'jees'});

		  //io.emit('chat', user);
		  console.log(jees);
		  console.log(keys[1]);
		  console.log(socket.id + '###');
		})
		console.log("jees");
		console.log(socket.id);
	});







};








module.exports = wsServerInit;
