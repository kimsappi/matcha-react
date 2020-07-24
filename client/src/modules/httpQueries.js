import axios from 'axios';

import {setUser, setToken} from './userData';

const baseUrl = 'http://localhost:3001/';

const getThisPage = url => {
	url = url.replace('3000', '3001');
	console.log(url);
	const request = axios.get(url);
	return request.then(response => response.data);
}

const submitLogin = (state, setState) => {
	const username = document.getElementById('username').value;
	const password = document.getElementById('password').value;

	const request = axios.post(baseUrl + 'login', {
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

// module.exports = {
// 	getThisPage,
// 	submitLogin
// };

export default submitLogin;
