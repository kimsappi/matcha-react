import React from 'react';
import {Link} from 'react-router-dom';

import {logOut} from '../../../modules/httpQueries';

const Nav = ({state, setState}) => {
	if (!state.loggedIn)
		return (
			<div>
				<Link to='/'>Home</Link>
				<Link to='/login'>Log in</Link>
			</div>
		);

	else
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

export default Nav;
