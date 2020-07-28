const mysql = require('mysql');

const pool = require('../modules/dbConnect');
const gender = require('../modules/gender');

const getGenderQueries = myData => {
	let ret = {};
	if (myData.target_genders.length === 2)
		ret.targets = '1=1';
	else
		ret.targets = `gender LIKE '${myData.target_genders}'`;

	ret.targetTargets = `target_genders LIKE '%${myData.gender}%'`;
	return ret;
}

const filterProfiles = (profiles, params) => {
	return profiles;
};

const get = (req, res, next) => {
	// User is not logged in
	console.log(req.user);
	if (!req.user)
		return res.json(null);
	const query = mysql.format('SELECT * FROM users WHERE id = ?;', [req.user.id]);
	console.log(query);
	pool.query(query, (error, result) => {
		if (error || !result)
			return res.json(null);
		if (!result[0])
			return res.json('empty');
		const myData = result[0];
		if (!myData.gender)
			return res.json('gender not set');
		const genderQueries = getGenderQueries(myData);
		const usersQuery = mysql.format(`SELECT * FROM users WHERE ${genderQueries.targets} AND ${genderQueries.targetTargets} AND id != ?;`, [req.user.id]);
		pool.query(usersQuery, (error, results) => {
			if (error)
				return res.json(null);
			return res.json(filterProfiles(results, req.params));
		});
	});
};

// const post = (req, res, next) => {
	
// };

module.exports = {
	get
	//post
};
