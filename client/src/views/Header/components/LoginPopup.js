import React, {useState, useEffect} from 'react';
import axios from 'axios';

import {Popup} from '../../../components/Popup';
import InputWithLabel from '../../../components/InputWithLabel';

import {setUser, setToken} from '../../../modules/userData';
import {userGeolocation} from '../../../modules/geolocate';

const baseUrl = 'http://localhost:3001/';

const submitLogin = (event, state, setState, setPopupState, username, password) => {
	event.preventDefault();
	setPopupState(false);

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

	axios.post(baseUrl + 'login', reqBody)
		.then(response => {
			if (!response.data) {
				setState({});
				setUser(null, null, false);
				setToken(null);
				return false;
			}
			else {
				console.log(response.data);
				setUser(response.data.username, response.data.id, true);
				setToken(response.data.token);
				setState({loggedIn: true, username: response.data.username, id: response.data.id});
				return true;
			}
		});
};

export const LoginPopup = ({state, setState, setPopupState}) => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	useEffect(() => {
		userGeolocation()
	}, []);
	

	return (
		<Popup>
			<form id='loginForm' onSubmit={event => submitLogin(event, state, setState, setPopupState, username, password)}>
				<InputWithLabel
					type='text'
					name='username' 
					label='Username'
					state={username}
					setState={setUsername}
				/>
				<InputWithLabel
					type='password'
					name='password' 
					label='Password'
					state={password}
					setState={setPassword}
				/>
				<input type='submit' name='submit' value='OK' />
			</form>
		</Popup>
	);
};