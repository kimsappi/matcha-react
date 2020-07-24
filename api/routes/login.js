const mysql = require('mysql');
const pool = require('../modules/dbConnect');
const hashPassword = require('../modules/hash');
const mysqlDatetime = require('../modules/mysqlDatetime');
const {getLoginCoordinates} = require('../modules/getLoginCoordinates');

const get = (req, res, next) => {
	// User is already logged in
	return res.json({
		loggedIn: true,
		username: 'admin'
	});
	if (req.session.user)
		return res.status(301).redirect('/');

	res.render('login');
};

const post = (req, res, next) => {
	// User is already logged in
	if (req.session.user)
		return res.status(301).redirect('/');
	
	// Username or password not provided
	if (!req.body.username || !req.body.password)
		return res.render('login');
	
	const hashedPassword = hashPassword(req.body.username, req.body.password);
	const query = 'SELECT * FROM `users` WHERE username = ? AND password = ?;';
	const preparedQuery = mysql.format(query, [req.body.username, hashedPassword]);

	pool.query(preparedQuery, (error, results) => {
		// Some kind of DB error
		if (error) {
			console.log('error',error);
			return res.json('Database error');
		}
		// Login successful
		else if (results && results[0] && !results[0].email_confirmation_string && !results[0].forgot_password_string) {
			// Get login coordinates either from req.body or user's IP
			const loginCoordinates = getLoginCoordinates(req, results[0]);

			req.session.user = {
				id: results[0].id,
				username: results[0].username
			};
			pool.query(`UPDATE users
				SET last_login = '${mysqlDatetime(new Date())}',
					latitude = ${loginCoordinates.latitude},
					longitude = ${loginCoordinates.longitude}
				WHERE id = ${results[0].id};`);
			return res.json(req.session.user);
		}
		// Email address is not confirmed
		else if (results) {
			return res.json(null);
		}
		// Password or username incorrect
		else
			return res.json(null);
	});
};

module.exports = {
	get,
	post
};
