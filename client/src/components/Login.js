import React, {useEffect} from 'react';

import getThisPage from '../modules/httpQueries';

const Login = props => {
	useEffect(() => {
		getThisPage(window.location.href)
		  .then(data => {
			if (data.loggedIn && data.loggedIn !== props.state.loggedIn)
			  props.setState({...props.state, loggedIn: data.loggedIn});
		  });
	});
	return (
		<div>
			<h1>Login page</h1>
			<input type='text' />
		</div>
	);
};

export default Login;
