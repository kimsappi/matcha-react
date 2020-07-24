import axios from 'axios';

import {setUser} from './userData';

const baseUrl = 'http://localhost:3001/';

const getThisPage = url => {
	url = url.replace('3000', '3001');
	console.log(url);
	const request = axios.get(url);
	return request.then(response => response.data);
}

const submitLogin = () => {
	const username = document.getElementById('username');
	const password = document.getElementById('password');

	const request = axios.post(baseUrl + 'login', {
		username: username,
		password: password
	})
		.then(response => {
			if (!response.data)
				return false;
			else {
				console.log(response.data);
				setUser(response.data.username, response.data.id);
				return true;
			}
		});
};

// module.exports = {
// 	getThisPage,
// 	submitLogin
// };

export default submitLogin;