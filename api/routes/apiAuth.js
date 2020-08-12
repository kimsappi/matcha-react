const fetch = require('node-fetch');
const FormData = require('form-data');
const config = require('../mailConfig.json');
const { response } = require('express');

const returnMeEndpoint = async code => {
	const data = new FormData();
	data.append('code', code);
	data.append('client_id', config["42clientId"]);
	data.append('client_secret', config["42clientSecret"]);
	data.append('grant_type', 'authorization_code');
	data.append('redirect_uri', config["42redirectUri"]);

	let ret = '';

	console.log('submitting apiLogin');
	await fetch('https://api.intra.42.fr/oauth/token', {
		method: 'post',
		body: data
	})
		.then(response => response.json())
		.then(async response => {
			console.log(response.access_token);
			await fetch('https://api.intra.42.fr/v2/me?access_token=' + response.access_token)
				.then(response => response.json())
				.then(response => ret = response)
				.catch(error => console.log(error));
		})
		.catch(error => console.log(error));
	return ret;
};

const register = async (req, res, next) => {
	console.log(req.body);
	if (!req.body.code)
		res.json(null);

	const apiResponse = await returnMeEndpoint(req.body.code);
	return res.json({
		username: apiResponse.login,
		first_name: apiResponse.first_name,
		last_name: apiResponse.last_name,
		email: apiResponse.email
	});
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
