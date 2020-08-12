const mysql = require('mysql');
const pool = require('../modules/dbConnect');
const fetch = require('node-fetch');
const FormData = require('form-data');
const config = require('../mailConfig.json');

const post = (req, res, next) => {
	console.log(req.body);
	if (!req.body.code)
		res.json(null);

	const data = new FormData();
	data.append('code', req.body.code);
	data.append('client_id', config["42clientId"]);
	data.append('client_secret', config["42clientSecret"]);
	data.append('grant_type', 'authorization_code');
	data.append('redirect_uri', config["42redirectUri"]);

	console.log('submitting apiLogin');
	fetch('https://api.intra.42.fr/oauth/token', {
		method: 'post',
		body: data
	})
		.then(response => response.json())
		.then(response => {
			console.log(response.access_token);
			fetch('https://api.intra.42.fr/v2/me?access_token=' + response.access_token)
				.then(response => response.json())
				.then(response => console.log(response));
		})
		.catch(error => {console.log('ERRRORRRR');console.log(error);});
};

module.exports = {
	post
};
