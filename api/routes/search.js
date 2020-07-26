const pool = require('../modules/dbConnect');
const gender = require('../modules/gender');

const getGenderQueries = myData => {
	let ret = {};
	if (myData.target_genders.length === 2)
		ret.targets = '1=1';
	else
		ret.targets = `gender LIKE '${myData.target_genders}'`;

	ret.targetTargets = `target_genders LIKE '%${myData.gender}'`;
	return ret;
}

const filterProfiles = (profiles, params) => {
	return profiles;
};

const get = (req, res, next) => {
	// User is not logged in
	if (!req.user)
		return res.json(null);
	const query = `SELECT * FROM users WHERE id = ${req.user.id};`;
	pool.query(query, (error, result) => {
		if (error || !result)
			return res.json(null);
		if (!result[0])
			return res.json('empty');
		const myData = result[0];
		if (!myData.gender)
			return res.json('gender not set');
		const genderQueries = getGenderQueries(myData);
		const usersQuery = `SELECT * FROM users WHERE ${genderQueries.targets} AND ${genderQueries.targetTargets} AND id != ${req.user.id};`;
		pool.query(usersQuery, (error, results) => {
			if (error)
				return res.json(null);
			return res.json({
				profiles: filterProfiles(results, req.params),
				user: req.user
			});
		});
	});
};

// const post = (req, res, next) => {
	
// };

module.exports = {
	get
	//post
};
