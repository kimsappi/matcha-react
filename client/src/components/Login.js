import React, {useEffect} from 'react';

import {submitLogin} from '../modules/httpQueries';

const Login = props => {	

	return (
		<div>
			<h1>Login page</h1>
			<p>Preset accounts: [admin1, 123], [admin2, 123]</p>
			<label htmlFor='username' />
			<input type='text' name='username' id='username' />
			<label htmlFor='password' />
			<input type='password' name='password' id='password' />
		</div>
	);
};

//			<button type='button' onClick={() => submitLogin(props.state, props.setState)}>OK</button>


export default Login;
