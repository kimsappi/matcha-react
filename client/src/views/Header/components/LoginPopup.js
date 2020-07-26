import React from 'react';
import axios from 'axios';

import {Popup} from '../../../components/Popup';

import {setUser, setToken} from '../../../modules/userData';


const baseUrl = 'http://localhost:3001/';

const submitLogin = (event, state, setState) => {
	event.preventDefault();
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

export const LoginPopup = ({state, setState}) => {
	return (
		<Popup>
			<form onSubmit={event => submitLogin(event, state, setState)}>
				<input type='text' name='username' id='username' />
				<input type='password' name='password' id='password' />
				<input type='submit' name='submit' value='OK' />
			</form>
		</Popup>
	);
};