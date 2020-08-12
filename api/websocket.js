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

// preparedQuery = mysql.format(query, [req.user.id, parseInt(userId), mysqlDatetime()]);
// 		console.log(preparedQuery);
// 		pool.query(preparedQuery, (error, results) => {
// 			if (error)
// 				return res.json(null);
// 			else
// 				return res.json('OK');



function addMessageToDatabase(myId, otherId, message, io, keys)
{
	const query = "SELECT * FROM blocks WHERE ((blocker = ? AND blockee = ?) OR (blocker = ? AND blockee = ?))";
	const prepareSql = mysql.format(query, [myId, otherId, otherId, myId]);
	pool.query(prepareSql, (error, results) => {
		if (results.length || error)
		{
			io.sockets.in(keys[myId]).emit('chat', {message: "empty", error: 'block', sender: myId});
			return false;
		}
		else
		{
			console.log("RESULTTI COUNTTI::" + results.length);
			const query= "INSERT INTO messages (sender, recipient, content) VALUES (?, ?, ?)";
			const prepareSql = mysql.format(query, [myId, otherId, message]);
			pool.query(prepareSql, (error, results) => {
				if (error)
				{
					io.sockets.in(keys[myId]).emit('chat', {message: 'empty', error: 'database', sender: myId});
					console.log("cb errori sisalla");
					return false;
				}
				else
				{
					console.log("PAASI LOPPUUN ASTI")

			

						io.sockets.in(keys[otherId]).emit('chat', {msg: message, sender: myId});
						io.sockets.in(keys[myId]).emit('chat', {msg: message, sender: myId});

					return true;
				}
			})
		}
	})




}

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
					console.log("Chat window opened succesfully");
					temp = user;   // VALIAIKAINEN!
			});
			keys[temp.id] = socket.id;  // VALIAIKAINEN!

			console.log("ARRAY: " + keys);

			socket.join(keys[data.user]);
	
		})

			// function runs when a message is sent in an open chat window.
		socket.on('chat', async function(jees) {
			var temp;
			jwt.verify(jees.me, tokenSecret, (err, user) => {
				if (err)
				{
					console.log("ERRRRORRRR");
					return;
				}
				else
					temp = user;
			});
			console.log("KOKEILUUUU ennen");

			addMessageToDatabase(temp.id, jees.id, jees.msg, io, keys);
			
			



			

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
			console.log('LOGGING IN');
		})
			// function run when user logs out
		socket.on('logOut', function(data) {
			console.log("LOG OUT WEBSOCKET");
			var temp;
			jwt.verify(data.user, tokenSecret, (err, user) => {
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
			console.log(temp);
			keys[temp.id] = '';
			console.log("ARRAY: " + keys);
		})


		console.log("jees");
		console.log(socket.id);
	});







};








module.exports = wsServerInit;
