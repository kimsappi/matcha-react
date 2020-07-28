import axios from 'axios';

import {setUser, setToken} from './userData';
import {getToken} from './userData';

import {likeButtonStrings} from '../config.json';

const baseUrl = 'http://localhost:3001';

const getAuthHeader = () => {
	return {Authorization: `Bearer ${getToken()}`};
}

export const getThisPage = relativeUrl => {
	const url = baseUrl + relativeUrl;
	console.log('Requesting from url:');
	console.log(url);
	console.log(getToken());
	const request = axios.get(url, {headers: getAuthHeader()});
	return request.then(response => response.data);
}

export const logOut = (state, setState) => {
	setState({});
	setUser(null, null);
	setToken(null);
};

export const submitLike = (path, action, state, setState) => {
	console.log(path, action);
	const url = baseUrl + path;
	let likeAction = '';
	if (action === likeButtonStrings.noLikes || action === likeButtonStrings.theyLike)
		likeAction = 'like';
	else
		likeAction = 'unlike';
	const request = axios.post(url, {action: likeAction},
		{headers: getAuthHeader()});
	request.then(response => console.log(response.data));
	setState(!state);
};

// module.exports = {
// 	getThisPage,
// 	submitLogin
// };

// module.exports = {
// 	submitLogin,
// 	logOut
// };
