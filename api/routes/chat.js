const mysql = require('mysql');
const pool = require('../modules/dbConnect');

const get = (req, res, next) => {
	return res.json(null);
	if (!req.user)
		return res.json(null);
	const query = 'SELECT * FROM messages WHERE '
};

const post = (req, res, next) => {
	return res.json(null);
};

module.exports = {
	get,
	post
};
