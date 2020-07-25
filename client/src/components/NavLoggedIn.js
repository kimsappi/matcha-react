import React from 'react';
import {Link} from 'react-router-dom';

import {logOut} from '../modules/httpQueries';

const NavLoggedIn = ({state, setState}) => {
	return (
		<div>
			<h1>You're logged in</h1>
			<p>Username: {state.username}</p>
			<Link to='/'>Home</Link>
			<Link to='/myProfile/profile'>Profile</Link>
			<Link onClick={() => logOut(state, setState)}>Log out</Link>
		</div>
	);
};

export default NavLoggedIn;
