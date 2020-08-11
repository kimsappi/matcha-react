const mysql = require('mysql');
const pool = require('../modules/dbConnect');

const get = (req, res, next) => {
	if (!req.user)
		return res.json(null);
		
	const query = 'SELECT latitude, longitude FROM users WHERE latitude > 0.0001 AND longitude > 0.0001';
	pool.query(query, (error, results) => {
		console.log('3435454');
		console.log(results.length);
		console.log('####');
		if (error || !results.length)
			return res.json([]);
		else
			return res.json(results);
	});
};

module.exports = {
	get
};
