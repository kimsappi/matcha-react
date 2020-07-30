import axios from 'axios';
import React, {Redirect} from 'react';

import {setUser, setToken} from './userData';
import {getToken} from './userData';

import {likeButtonStrings} from '../config.json';

const baseUrl = 'http://localhost:3001';

// This function will generate a link to a user image on the server.
// Can be used with 2 arguments: (id, extension) or 1: (filename)
export const generateImageUrl = (id, extension) => {
	const dirUrl = baseUrl + '/img/userPhotos/'
	if (typeof extension === 'undefined')
		return dirUrl + id;
	else
		return dirUrl + id + '.' + extension;
};

export const fallbackImageUrl = event => {
	event.target.src = generateImageUrl('placeholder.png');
}

const getAuthHeader = () => {
	return {Authorization: `Bearer ${getToken()}`};
};

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
	window.location.href = '/';
};

export const uploadPhoto = photos => {
	let formData = new FormData();
	Array.prototype.forEach.call(photos, photo => {
		formData.append('photos', photo);
		console.log('file appended');
	});
	console.log(formData.getAll('photos'));
	const request = axios.post(baseUrl + '/myProfile/pics', formData, {headers: getAuthHeader()});
	return request.then(response => response.data);
}

export const photoActions = (action, id) => {
	const request = axios.post(baseUrl + '/myProfile/photoActions',
		{action: action, id: id},
		{headers: getAuthHeader()});
	return request.then(response => response.data);
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

const startWebSocket = () => {
	console.log('Creating socket');
	const socket = new WebSocket('ws://localhost:3002/');

	socket.onopen = function() {

		console.log('Socket open.');
		socket.send(JSON.stringify({message: 'What is the meaning of life, the universe and everything?'}));
		console.log('Message sent.')
	};

	socket.onmessage = function(message) {
		console.log('Socket server message', message);
	};
}

export const submitLogin = (event, state, setState, setPopupState, username, password, webSocket, setWebSocket) => {
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
				startWebSocket();

				return <Redirect to='/' />;
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

	axios.post(baseUrl + '/forgotPassword', reqBody)
		.then(response => {
			if (!response.data)
				alert('Something went wrong, nothing has been done.');
			else
				setPopupState(false);
		});
};

export const submitResetPassword = (event, setPopupState, password, confirmPassword) => {
	event.preventDefault();

	axios.post(baseUrl + '/resetPassword', {password: password, confirmPassword: confirmPassword})
		.then(response => {
			if (!response.data)
				alert('Something went wrong');
			else
				setPopupState(false);
		});
};

export const submitConfirmEmailOrResetPassword = (obj, endpoint) => {
	axios.post(baseUrl + '/' + endpoint, obj)
		.then(response => {
			if (!response.data)
				alert('Something went wrong, nothing has been done.');
			else
				return true;
			return false;				
		});
};

export const parseSearchString = str => {
	if (str.length < 2)
		return null;
	const arr = str.substring(1).split('&');
	const ret = {};
	arr.forEach(value => {
		if (value.split('=').length === 2)
			ret[value.split('=')[0]] = value.split('=')[1];
	});
	return ret;
}

// module.exports = {
// 	getThisPage,
// 	submitLogin
// };

// module.exports = {
// 	submitLogin,
// 	logOut
// };
