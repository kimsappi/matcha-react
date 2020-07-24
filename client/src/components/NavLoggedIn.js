import React from 'react';
import {Link} from 'react-router-dom';

const NavLoggedIn = props => {
	return (
		<div>
			<h1>You're logged in</h1>
			<p>Username: {props.username}</p>
			<Link to='/'>Home</Link>
			<Link to='/login'>Log in</Link>
		</div>
	);
};

export default NavLoggedIn;
