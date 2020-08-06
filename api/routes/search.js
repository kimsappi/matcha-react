const mysql = require('mysql');

const pool = require('../modules/dbConnect');
const calculateDistance = require('../modules/calculateDistance');

const getGenderQueries = myData => {
	let ret = {};
	if (myData.target_genders.length === 2)
		ret.targets = '1=1';
	else
		ret.targets = `gender LIKE '${myData.target_genders}'`;

	ret.targetTargets = `target_genders LIKE '%${myData.gender}%'`;
	return ret;
}

const filterProfiles = (profiles, params, user) => {
	const nullAgeFiltered = profiles.filter(profile => profile.age);
	//console.log('nullAgeFiltered: ' + nullAgeFiltered);
	const ret = nullAgeFiltered.map(profile => {
		if (!profile.age)
			return;

		let distance = calculateDistance(user.lat, user.lon, profile.latitude, profile.longitude);
		if (isNaN(distance))
			distance = 'Unknown';

		let commonTags = 0;
		let tags = [];
		if (profile.tags_string) {
			tags = profile.tags_string.split(',');
			if (user.tags)
				tags.forEach(tag => {
					if (user.tags.includes(tag))
						commonTags += 1;
				});
		}
		return {...profile, distance: distance, commonTags: commonTags, tags: tags};
	});
	//console.log(ret);
	return ret;
};

const get = (req, res, next) => {
	// User is not logged in
	//console.log(req.user);
	if (!req.user)
		return res.json(null);
	const query = mysql.format('SELECT * FROM users WHERE id = ?;', [req.user.id]);
	//console.log(query);
	pool.query(query, (error, result) => {
		if (error || !result)
			return res.json(null);
		if (!result[0])
			return res.json('empty');
		const myData = result[0];
		if (!myData.gender)
			return res.json('gender not set');
		const genderQueries = getGenderQueries(myData);
		const usersQuery = mysql.format(`SELECT * FROM user_and_main_photo WHERE ${genderQueries.targets} AND ${genderQueries.targetTargets} AND id != ?;`, [req.user.id]);
		pool.query(usersQuery, (error, results) => {
			if (error)
				return res.json(null);
			return res.json(filterProfiles(results, req.params, req.user));
		});
	});
};

// const post = (req, res, next) => {
	
// };

module.exports = {
	get
	//post
};
