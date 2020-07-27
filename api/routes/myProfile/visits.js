const mysql = require('mysql');
const pool = require('../../modules/dbConnect');

const processVisits = (results, userId) => {
	const ret = {
		visited: [],
		visitedMe: []
	}

	results.forEach(element => {
		if (element.visitor === userId)
			ret.visited.push(element);
		else
			ret.visitedMe.push(element);
	});

	return ret;
}

const get = (req, res, next) => {
	if (!req.user)
		res.json(null);

	const selectvisitor = 'visitor.id AS visitor, visitor.first_name as visitorFName, visitor.last_name as visitorLName, \
	visitor.latitude as visitorLat, visitor.longitude as visitorLon';
	const selectvisitee = selectvisitor.split("visitor").join("visitee");
	const select = selectvisitor + ', ' + selectvisitee;

	const query = 'SELECT ' + select + ' FROM visits \
		INNER JOIN users AS visitor ON visitor.id = visits.visitor \
		INNER JOIN users AS visitee ON visitee.id = visits.visitee \
		WHERE visits.visitor = ? OR visits.visitee = ?;'
		//ORDER BY FIELD(visitor, ?);'
	console.log(query);
	const preparedQuery = mysql.format(query, [req.user.id, req.user.id, req.user.id, req.user.id]);
	pool.query(preparedQuery, (error, results) => {
		if (error)
			return res.json(null);
		else if (!results.length)
			return res.json('empty');
		else
			return res.json(processVisits(results, req.user.id));
	});
};


module.exports = {
	get
};
