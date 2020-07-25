import axios from 'axios';

import {setUser, setToken} from './userData';
import {getToken} from './userData';

const baseUrl = 'http://localhost:3001/';

export const getThisPage = url => {
	url = url.replace('3000', '3001');
	console.log('Requesting from url:');
	console.log(url);
	console.log(getToken());
	const request = axios.get(url, {headers: {Authorization: `Bearer ${getToken()}`}});
	return request.then(response => response.data);
}

export const submitLogin = (state, setState) => {
	const username = document.getElementById('username').value;
	const password = document.getElementById('password').value;

	axios.post(baseUrl + 'login', {
		username: username,
		password: password
	})
		.then(response => {
			if (!response.data) {
				setState({});
				setUser(null, null);
				setToken(null);
				return false;
			}
			else {
				console.log(response.data);
				setUser(response.data.username, response.data.id);
				setToken(response.data.token);
				setState({loggedIn: true, username: response.data.username, id: response.data.id});
				return true;
			}
		});
};

export const logOut = (state, setState) => {
	setState({});
	setUser(null, null);
	setToken(null);
};

// module.exports = {
// 	getThisPage,
// 	submitLogin
// };

// module.exports = {
// 	submitLogin,
// 	logOut
// };
