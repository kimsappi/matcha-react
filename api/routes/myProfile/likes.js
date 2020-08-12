const mysql = require('mysql');
const pool = require('../../modules/dbConnect');

const processLikes = (results, userId) => {
	const ret = {
		liked: [],
		likedMe: [],
		matches: 'NOT IMPLEMENTED'
	}

	results.forEach(element => {
		if (element.liker === userId)
			ret.liked.push(element);
		else
			ret.likedMe.push(element);
	});

	return ret;
}

const get = (req, res, next) => {
	if (!req.user)
		res.json(null);

	const selectLiker = 'liker.username AS likerUsername, liker.fame AS likerFame, liker.main_pic AS likerPic, liker.id AS liker, liker.first_name as likerFName, liker.last_name as likerLName, \
	liker.latitude as likerLat, liker.longitude as likerLon, likerPhoto.extension AS likerPhoto';
	const selectLikee = selectLiker.split("liker").join("likee");
	const select = selectLiker + ', ' + selectLikee;

	const query = 'SELECT ' + select + ' FROM likes \
		INNER JOIN users AS liker ON liker.id = likes.liker \
		INNER JOIN users AS likee ON likee.id = likes.likee \
		INNER JOIN user_photos AS likerPhoto ON likerPhoto.id = liker.main_pic \
		INNER JOIN user_photos AS likeePhoto ON likeePhoto.id = likee.main_pic \
		WHERE likes.liker = ? OR likes.likee = ?;'
		//ORDER BY FIELD(liker, ?);'
	console.log(query);

	const preparedQuery = mysql.format(query, [req.user.id, req.user.id, req.user.id, req.user.id]);
	pool.query(preparedQuery, (error, results) => {
		if (error)
			return res.json(null);
		else if (!results.length)
			return res.json('empty');
		else
			return res.json(processLikes(results, req.user.id));
	});
};


module.exports = {
	get
};
