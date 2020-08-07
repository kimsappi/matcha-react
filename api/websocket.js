const socket = require('socket.io');

const jwt = require('jsonwebtoken');
const mysql = require('mysql');

const {tokenSecret} = require('./config.json');
const pool = require('./modules/dbConnect');
const { startWatchingDataUpdate } = require('geoip-lite');

// function auth(thetoken) {
// 	console.log("TOKEN:::" + thetoken);
// 	const authHeader = thetoken;
// 	const token = authHeader;
// 	if (!token) 
// 		return "no token error";

// 	else {
// 		jwt.verify(token, tokenSecret, (err, user) => {
// 			console.log("ennen");
// 			console.log(user);
// 			console.log("jalkeen");
// 			return user;

// 			if (err) 
// 				return "jwt error";
// 			else {
// 				console.log('querying online status');
// 				pool.query(mysql.format('SELECT `online` FROM users WHERE id = ? AND login_id = ?;', [user.id, user.login_id]), (error, results) => {
// 					if (error || !results[0] || !results[0].online)
// 						return res.json('logged out');
// 					else {
// 						return user;
// 					}
// 				})
// 			}
// 		});
// 	}
// }

const wsServerInit = server => {

	const io = socket(server);
	const keys = [];
	

	io.on('connection', function(socket) {

			// function runs, when a new chat window is opened. Check that the opener is a legit user.
		socket.on('privateChat', function(data) {
			var temp;
			jwt.verify(data.me, tokenSecret, (err, user) => {
				if (err)
					console.log("ERRRRORRRR");
				else
					console.log("Chat window opened succesfully")
			});
			console.log("ARRAY: " + keys);

			socket.join(keys[data.user]);
	
		})

			// function runs when a message is sent in an open chat window.
		socket.on('chat', function(jees) {

			io.sockets.in(keys[jees.id]).emit('chat', {message: jees.msg});

			//io.emit('chat', {okei: 'jees'});

			//io.emit('chat', user);
			console.log(jees);
			console.log(keys[1]);
			console.log(socket.id + '###');
		})

			// function runs when a user logs in. The wsId array updates here.
		socket.on('logIn', function(token) {
			var temp;
			jwt.verify(token.token, tokenSecret, (err, user) => {
				if (err)
				{
					console.log("ERRRRORRRR");
					return;
				}
				else
				{
					temp = user;
					console.log(user);
				}
			});
			keys[temp.id] = socket.id;
			console.log("ARRAY: " + keys);
		})


		console.log("jees");
		console.log(socket.id);
	});







};








module.exports = wsServerInit;
