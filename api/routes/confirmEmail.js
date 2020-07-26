const mysql = require('mysql');
const pool = require('../modules/dbConnect');

const get = (req, res, next) => {
	// User is already logged in
	if (req.user || !req.query.user || !req.query.token)
		return res.json(null);
	
	const query = `
	UPDATE users
		SET email_confirmation_string = NULL
		WHERE username = ? AND email_confirmation_string = ?;
	`;

	const preparedQuery = mysql.format(query, [req.query.user, req.query.token]);
	pool.query(preparedQuery);
	return res.json('OK');
};

module.exports = {
	get
};
