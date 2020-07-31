const mysql = require('mysql');
const pool = require('../modules/dbConnect');

const post = (req, res, next) => {
	if (!req.user)
		return res.json(null);
	let randomQuery = '';
	// Log user out from all devices (invalidate old JWTs)
	if (req.body.all)
		randomQuery = ", login_id = '" + Math.random().toString(36).slice(2) + "'";
	const query = mysql.format('UPDATE users SET \`online\` = FALSE' + randomQuery + ' WHERE id = ?;', [req.user.id]);
	console.log(query);
	pool.query(query, (error, results) => {
		if (error)
			return res.json(null);
		else
			return res.json('OK');
	});
};

module.exports = {
	post
};
