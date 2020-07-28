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

export const submitLogin = (event, state, setState, setPopupState, username, password) => {
	event.preventDefault();

	let reqBody = {
		username: username,
		password: password
	};
	if (document.querySelector('#latitude')) {
		reqBody = {...reqBody,
			latitude: document.querySelector('#latitude').value || null,
			longitude: document.querySelector('#longitude').value || null
		}
	}

	axios.post(baseUrl + '/login', reqBody)
		.then(response => {
			if (!response.data || response.data === 'email') {
				setState({});
				setUser(null, null, false);
				setToken(null);
				if (response.data === 'email')
					alert('Make sure to confirm your email address before logging in.');
				else
					alert('Login failed.');
				return false;
			}
			else {
				console.log(response.data);
				console.log('asddd');
				setUser(response.data.username, response.data.id, true);
				setToken(response.data.token);
				setState({loggedIn: true, username: response.data.username, id: response.data.id});
				setPopupState(false);
				return true;
			}
		});
};

export const submitRegister = (event, setPopupState, username, password, confirmPassword, email, firstName, lastName) => {
	event.preventDefault();

	const reqBody = {
		username: username,
		password: password,
		confirmPassword: confirmPassword, 
		email: email,
		firstName: firstName,
		lastName: lastName
	};

	axios.post(baseUrl + '/register', reqBody)
		.then(response => {
			if (response.data)
				setPopupState(false);
			else
				alert('Failed to register an account.');
		});
};

export const submitForgot = (event, setPopupState, email) => {
	event.preventDefault();

	const reqBody = {email: email};

	axios.post(baseUrl + '/register', reqBody)
		.then(response => {
			if (response.data)
				alert('Something went wrong, nothing has been done.');
			else
				setPopupState(false);
		});
};

// module.exports = {
// 	getThisPage,
// 	submitLogin
// };

// module.exports = {
// 	submitLogin,
// 	logOut
// };
