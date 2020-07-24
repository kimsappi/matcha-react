import React, {useEffect} from 'react';

import submitLogin from '../modules/httpQueries';

const Login = props => {	
	return (
		<div>
			<h1>Login page</h1>
			<label htmlFor='username' />
			<input type='text' name='username' id='username' />
			<label htmlFor='password' />
			<input type='password' name='password' id='password' />
			<button type='button' onClick={submitLogin}>OK</button>
		</div>
	);
};

export default Login;
