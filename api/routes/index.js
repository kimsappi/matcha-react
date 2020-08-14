/* GET home page. */
const get = (req, res, next) => {
	res.render('index',
		{
			title: 'Express',
			user: req.session.user
		}
	);
};

module.exports = {get};
