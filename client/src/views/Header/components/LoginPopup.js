import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';

import {Popup} from '../../../components/Popup';
import InputWithLabel from '../../../components/InputWithLabel';

import {userGeolocation} from '../../../modules/geolocate';
import {submitLogin} from '../../../modules/httpQueries';

export const LoginPopup = ({state, setState, setPopupState, webSocket, setWebSocket}) => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	useEffect(() => {
		userGeolocation()
	}, []);

	return (
		<Popup setPopupState={setPopupState}>
			<form id='loginForm' onSubmit={event => submitLogin(event, state, setState, setPopupState, username, password, webSocket, setWebSocket)}>
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
			<Link to='#' onClick={() => setPopupState('forgotPassword')}>
				Forgot your password?
			</Link>
		</Popup>
	);
};
