const fetch = require('node-fetch');
const FormData = require('form-data');
const config = require('../mailConfig.json');
const { response } = require('express');

const returnMeEndpoint = (code, action) => {
	const data = new FormData();
	data.append('code', code);
	data.append('client_id', config["42clientId"]);
	data.append('client_secret', config["42clientSecret"]);
	data.append('grant_type', 'authorization_code');
	data.append('redirect_uri', config["42redirectUri" + action]);

	return new Promise((resolve, reject) => {
		fetch('https://api.intra.42.fr/oauth/token', {
			method: 'post',
			body: data
		})
			.then(response => response.json())
			.then(response => {
				console.log(response);
				fetch('https://api.intra.42.fr/v2/me?access_token=' + response.access_token)
					.then(response => response.json())
					.then(response => resolve(response))
					.catch(error => reject(error));
			})
			.catch(error => reject(error));
		});
};

const register = (req, res, next) => {
	console.log(req.body);
	if (!req.body.code)
		res.json(null);

	returnMeEndpoint(req.body.code, 'Register')
		//.then(apiResponse => console.log(apiResponse))
		//.catch(error => console.log(error));
		.then(apiResponse => res.json({
			action: 'register',
			username: apiResponse.login,
			first_name: apiResponse.first_name,
			last_name: apiResponse.last_name,
			email: apiResponse.email
	}));
};

const login = async (req, res, next) => {
	console.log(req.body);
	if (!req.body.code)
		res.json(null);

	const apiResponse = await returnMeEndpoint(req.body.code);
	console.log(apiResponse);
	return res.json({
		username: apiResponse.login,
		first_name: apiResponse.first_name,
		last_name: apiResponse.last_name,
		email: apiResponse.email
	});
};

module.exports = {
	login,
	register
};
