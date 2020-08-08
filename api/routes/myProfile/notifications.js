const mysql = require('mysql');
const pool = require('../../modules/dbConnect');

const get = (req, res, next) => {
	if (!req.user)
		return res.json(null);
	const query = 'SELECT * FROM notifications WHERE user = ? ORDER BY id ASC;';
	pool.query(mysql.format(query, [req.user.id]), (error, results) => {
		if (error)
			return res.json(null);
		else {
			if (req.query.read) {
				const readQuery = 'UPDATE notifications SET `read` = 1 WHERE user = ?;';
				// Don't need callback as this is not critical
				pool.query(mysql.format(readQuery, [req.user.id]));
			};
			return res.json(results);
		}
	});
};

module.exports = {
	get
};
