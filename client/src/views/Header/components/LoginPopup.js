import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';

import {Popup} from '../../../components/Popup';
import InputWithLabel from '../../../components/InputWithLabel';

import {userGeolocation} from '../../../modules/geolocate';
import {submitLogin} from '../../../modules/httpQueries';

export const LoginPopup = ({state, setState, setPopupState}) => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const button = 
	{
		color: 'white',
		fontWeight: 'bold',
		backgroundColor: '#000050',
		padding: '5px 15px',
		boxShadow: '6px 6px 29px -4px rgba(0, 0, 0, 0.75)',
		borderRadius: '5px',
		marginTop: '25px',
		transition: '0.4s'
	}

	useEffect(() => {
		userGeolocation()
	}, []);

	return (
		<Popup setPopupState={setPopupState}>
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
				<input style={button} type='submit' name='submit' value='OK' />
			</form>
			<Link to='#' onClick={() => setPopupState('forgotPassword')}>
				Forgot your password?
			</Link>
		</Popup>
	);
};
