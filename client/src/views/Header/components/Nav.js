import React, {useState} from 'react';
import {Link} from 'react-router-dom';

import {LoginPopup} from './LoginPopup';

import {logOut} from '../../../modules/httpQueries';

const renderLoginPopup = (setPopupState) => {
	setPopupState(true);
};

const Nav = ({state, setState}) => {
	const [popupState, setPopupState] = useState(false);

	if (!state.loggedIn)
		return (
			<>
				<div>
					<Link to='/'>Home</Link>
					<Link to='#' onClick={() => renderLoginPopup(setPopupState)}>Log in</Link>
				</div>
				{popupState ? <LoginPopup state={state} setState={setState} /> : null}
			</>
		);

	else
		return (
			<div>
				<h1>You're logged in</h1>
				<p>Username: {state.username}</p>
				<Link to='/'>Home</Link>
				<Link to='/myProfile/profile'>Profile</Link>
				<Link to='#' onClick={() => logOut(state, setState)}>Log out</Link>
			</div>
		);
};

export default Nav;
