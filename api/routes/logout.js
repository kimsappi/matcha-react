const mysql = require('mysql');
const pool = require('../modules/dbConnect');

const post = (req, res, next) => {
	if (!req.user)
		return res.json(null);
	const query = mysql.format('UPDATE users SET \`online\` = FALSE WHERE id = ?;', [req.user.id]);
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
