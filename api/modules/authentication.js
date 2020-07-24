// const jwt = require('jsonwebtoken');

// const {tokenSecret} = require('../config.json');

// const authenticationMiddleware = (req, res, next) => {
// 	const authHeader = req.headers['authorization'];
// 	const token = authHeader && authHeader.split(' ')[1];
// 	if (!token)
// 		req.user = null;
// 	else
// 		jwt.verify(token, tokenSecret, (err, user) => {
// 			if (err)
// 				req.user = null;
// 			else
// 				req.user = user;
// 		});
// 	next();
// }

// const generateJWT = data => jwt.sign(data, tokenSecret, {expiresIn: '3600s'});

// module.exports = {
// 	authenticationMiddleware,
// 	generateJWT
// }