import React, {useState} from 'react';

import {Popup} from '../../../components/Popup';
import InputWithLabel from '../../../components/InputWithLabel';

import {submitRegister} from '../../../modules/httpQueries';

export const RegisterPopup = ({setPopupState}) => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [email, setEmail] = useState('');
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');

	return (
		<Popup setPopupState={setPopupState}>
			<form id='registerForm'
				onSubmit={event =>
					submitRegister(event, setPopupState,
					username, password, confirmPassword,
					email, firstName, lastName)}
			>
				
				<InputWithLabel
					type='text'
					name='username' 
					label='Username'
					state={username}
					setState={setUsername}
				/>
				<InputWithLabel
					type='email'
					name='email' 
					label='Email'
					state={email}
					setState={setEmail}
				/>
				<InputWithLabel
					type='text'
					name='firstName' 
					label='First name'
					state={firstName}
					setState={setFirstName}
				/>
				<InputWithLabel
					type='text'
					name='lastName' 
					label='Last name'
					state={lastName}
					setState={setLastName}
				/>
				<InputWithLabel
					type='password'
					name='password' 
					label='Password'
					state={password}
					setState={setPassword}
				/>
				<InputWithLabel
					type='password'
					name='confirmPassword' 
					label='Confirm password'
					state={confirmPassword}
					setState={setConfirmPassword}
				/>
				<input type='submit' name='submit' value='OK' />
			</form>
		</Popup>
	);
};
