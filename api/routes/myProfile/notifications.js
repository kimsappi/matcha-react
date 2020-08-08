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
			let markRead = '';
			if (req.query.read)
				markRead = ', `read` = 1 ';
			const readQuery = 'UPDATE notifications SET `sent` = 1 ' + markRead + 'WHERE user = ?;';
			// Don't need callback as this is not critical
			pool.query(mysql.format(readQuery, [req.user.id]));
			return res.json(results);
		}
	});
};

const intervalQuery = id => {
	const query = 'SELECT * FROM notifications WHERE user = ? AND `sent` = FALSE ORDER BY id ASC;';
	
	return new Promise((resolve, reject) => {
		pool.query(mysql.format(query, [id]), (error, results) => {
			if (error)
				resolve([]);
			else
				resolve(results);
		});
	});
};

const longGet = (req, res, next) => {
	if (!req.user)
		return res.json(null);
	let i = 0;
	const longInterval = setInterval(() => {
		++i;
		const results = intervalQuery(req.user.id);
		results.then(result => {
			console.log('long resolved ' + i);
			if (result.length || i == 30) {
				//console.log(result);
				pool.query(mysql.format('UPDATE notifications SET `sent` = 1 WHERE user = ?;'), [req.user.id]);
				clearInterval(longInterval);
				return res.json(result);
			}
		});
	}, 1000);
}

module.exports = {
	get,
	longGet
};
