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
