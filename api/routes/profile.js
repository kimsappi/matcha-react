const mysql = require('mysql');

const pool = require('../modules/dbConnect');
const {getGenderEmoji} = require('../modules/gender.js');
const mysqlDatetime = require('../modules/mysqlDatetime');

const config = require('../config.json');
const calculateDistance = require('../modules/calculateDistance');


const getBlockButtonStatus = async (user, other) => {
	// User is looking at their own profile
	if (user.id === other.id)
		return null;

	const query = mysql.format(
		'SELECT * FROM blocks WHERE (blocker = ? AND blockee = ?);',
		[user.id, other.id]);

	const ret = new Promise((resolve, reject) => {
		pool.query(query, (error, results) => {
			// No likes either way
			if (error || !results.length)
				resolve(false);
			else
				resolve(true);
		})
	});
	return ret;
}

const getLikeButtonStatus = async (user, other) => {
	// User is looking at their own profile
	if (user.id === other.id)
		return null;

	const query = mysql.format(
		'SELECT * FROM likes WHERE (liker = ? AND likee = ?) OR (liker = ? AND likee = ?);',
		[user.id, other.id, other.id, user.id]);

	const ret = new Promise((resolve, reject) => {
		pool.query(query, (error, results) => {
			// No likes either way
			if (error || !results.length)
				resolve(config.likeButtonStrings['noLikes']);
			// Both like each other
			else if (results.length === 2)
				resolve(config.likeButtonStrings['mutualLike']);
			// You like them
			else if (results[0].liker === user.id)
				resolve(config.likeButtonStrings['youLike']);
			// They like you
			else
				resolve(config.likeButtonStrings['theyLike']);
		})
	});
	return ret;
};

// const getImages = async id => {
// 	const ret = new Promise((resolve, reject) => {
// 		pool.query(mysql.format("SELECT * FROM user_photos WHERE user = ?;", [parseInt(id)]), (error, results) => {
// 		//pool.query("SELECT * FROM user_photos WHERE user = 1;", (error, results) => {
// 			if (error)
// 				reject('error');
// 			resolve(results);
// 		});
// 	});
// 	return ret;
// };

const get = async (req, res, next) => {
	const userId = req.params.id;
	// User is not logged in or no id provided or id is invalid
	if (!req.user || !userId ||
		req.user.id == userId || !Number.isInteger(parseFloat(userId))
	)
		return res.json(null);

	// userId is already verified to be an integer so no need to prepare
	const query = `SELECT * FROM user_and_main_photo WHERE id = ${userId} AND ${req.user.id} NOT IN (SELECT blockee FROM blocks WHERE blocker=${userId});`;

	pool.query(query, async (error, results) => {
		if (error || !results || !results[0])
			return res.json(null);
		
		const visitQuery = `DELETE FROM visits WHERE visitor = ? AND visitee = ?;
		INSERT INTO visits (visitor, visitee, \`time\`) VALUES (?, ?, ?);`
		const preparedVisitQuery = mysql.format(visitQuery, [
			req.user.id, results[0].id, req.user.id, results[0].id, mysqlDatetime(new Date())
		]);

		// Don't really care about success so no callback
		pool.query(preparedVisitQuery, (error, results) => {});

		const blockButtonStatus = getBlockButtonStatus(req.user, results[0]);
		const likeButtonStatus = getLikeButtonStatus(req.user, results[0]);
		//const images = getImages(req.params.id);
		Promise.all([likeButtonStatus, blockButtonStatus])//, images])
			.then((likeButtonStatus) => {
				console.log('like button: ' + likeButtonStatus);
				return res.json({
					profileData: {...results[0], distance: calculateDistance(req.user.lat, req.user.lon, results[0].latitude, results[0].longitude)},
					images: results[0].images.split(','),
					lookingFor: getGenderEmoji(results[0].target_genders),
					gender: getGenderEmoji(results[0].gender),
					title: `${results[0].first_name} ${results[0].last_name[0]}.`,
					likeButton: likeButtonStatus[0],
					blockStatus: likeButtonStatus[1]
				});
			});
	});
};

// Liking another user, etc.
const post = (req, res, next) => {
	const userId = req.params.id;
	console.log(req.user);
	// User is not logged in or action not set
	if (!req.user || !req.body.action || !userId || req.user.id == userId ||
		!Number.isInteger(parseFloat(userId)))
		return res.json(null);
	console.log(req.body);

	let query = ''; let preparedQuery = '';

	if (req.body.action === 'like')
		query = 'INSERT INTO likes (liker, likee) VALUES (?, ?);';
	else if (req.body.action === 'unlike')
		query = 'DELETE FROM likes WHERE liker = ? AND likee = ?;';
	else if (req.body.action === 'block')
		query = 'INSERT INTO blocks (blocker, blockee, time) VALUES (?, ?, ?);';
	else if (req.body.action === 'unblock')
		query = 'DELETE FROM blocks WHERE blocker = ? AND blockee = ?;';
	else if (req.body.action === 'report')
		query = 'INSERT INTO reports (reporter, reportee) VALUES (?, ?);';	

	if (query.length) {
		preparedQuery = mysql.format(query, [req.user.id, parseInt(userId), mysqlDatetime()]);
		console.log(preparedQuery);
		pool.query(preparedQuery, (error, results) => {
			if (error)
				return res.json(null);
			else
				return res.json('OK');
		});
	}
	else
		return res.json(null);
};

module.exports = {
	get,
	post
};
