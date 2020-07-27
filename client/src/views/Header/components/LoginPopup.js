import React, {useState} from 'react';
import axios from 'axios';

import {Popup} from '../../../components/Popup';
import InputWithLabel from '../../../components/InputWithLabel';

import {setUser, setToken} from '../../../modules/userData';


const baseUrl = 'http://localhost:3001/';

const submitLogin = (event, state, setState, setPopupState, username, password) => {
	event.preventDefault();
	setPopupState(false);

	axios.post(baseUrl + 'login', {
		username: username,
		password: password
	})
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

	return (
		<Popup>
			<form onSubmit={event => submitLogin(event, state, setState, setPopupState, username, password)}>
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