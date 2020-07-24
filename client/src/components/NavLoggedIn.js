import React from 'react';
import {Link} from 'react-router-dom';

const NavLoggedIn = () => {
	return (
		<div>
			<h1>You're logged in</h1>
			<Link to='/'>Home</Link>
			<Link to='/login'>Log in</Link>
		</div>
	);
};

export default NavLoggedIn;
