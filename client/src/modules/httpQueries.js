import axios from 'axios';
import io from 'socket.io-client';

import {setUser, setToken} from './userData';
import {getToken} from './userData';

import {likeButtonStrings} from '../config.json';

const baseUrl = 'http://localhost:3001';

// This function will generate a link to a user image on the server.
// Can be used with 2 arguments: (id, extension) or 1: (filename)
export const generateImageUrl = (id, extension) => {
	if (id === 'placeholder.png' || !id || id === 'null')
		return baseUrl + '/img/' + 'placeholder.png';
	const dirUrl = baseUrl + '/img/userPhotos/';
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
	return request.then(response => {
		if (response.data === 'logged out') {
			localLogout(true);
			return;
		}
		else
			return response.data;
	});
}

const localLogout = (reload = false) => {
	localStorage.clear();
	if (reload)
		window.location.href = '/';
}

export const logOut = (setState, all = false) => {
	const url = baseUrl + '/logout';
	const request = axios.post(url, {all: all}, {headers: getAuthHeader()});
	console.log(getAuthHeader());
	setState({});
	request.then(response => localLogout(true));

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

export const photoActions = (action, id, rerenderTrick, setRerenderTrick) => {
	const request = axios.post(baseUrl + '/myProfile/photoActions',
		{action: action, id: id},
		{headers: getAuthHeader()});
	if (action === 'delete')
		window.location.reload(false);
	return request.then(response => {
		setRerenderTrick(!rerenderTrick);
		return response.data;
	});
	
};

export const sendMyProfileData = (firstName, lastName, age, latitude, longitude, email, gender, target, biography, tags) => {
	const url = baseUrl + '/myProfile/profile';
	const reqBody = {
		firstName: firstName,
		lastName: lastName,
		age: age,
		latitude: latitude,
		longitude: longitude,
		email: email,
		gender: gender,
		target: target,
		biography: biography,
		tags: tags
	};

	const request = axios.post(url, reqBody, {headers: getAuthHeader()});
	request.then(response => {
		if (response.data) {
			setToken(response.data.token);
		}
	})
}

export const submitLike = (path, action, state, setState) => {
	
	const url = baseUrl + path;
	let likeAction = '';
	if (action === 'block')
		likeAction = 'block';
	else if (action === 'unblock')
		likeAction = 'unblock';
	else if (action === likeButtonStrings.noLikes || action === likeButtonStrings.theyLike)
		likeAction = 'like';
	else
		likeAction = 'unlike';
		console.log("ASd");
	console.error(url);
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
			if (!response.data || response.data === 'email' || response.data === 'Database error') {
				setState({});
				localStorage.clear();
				if (response.data === 'email')
					alert('Make sure to confirm your email address before logging in.');
				else
					alert('Login failed.');
				return false;
			}
			else {
				console.log(response.data);
				console.log('asddd');
				setUser(response.data.username, response.data.id, response.data.age, response.data.tags, true);
				setToken(response.data.token);
				setState({loggedIn: true, username: response.data.username, id: response.data.id});
				setPopupState(false);
				window.location.href = '/';
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

export const getConnections = () => {
	const request = axios.get(baseUrl + '/getConnections', {headers: getAuthHeader()})
		return request.then(response => {
			// console.log(response);
			if (!response.data)
				alert('Something went wrong (getConnections) (probably trying to get connections without being logged in)');
			else
			{
				console.log("jees");
				return(response.data);
			}
		});
};
