import React, {useState} from 'react';
import {Link} from 'react-router-dom';

import {LoginPopup} from './LoginPopup';

import {logOut} from '../../../modules/httpQueries';

const Nav = ({state, setState}) => {
	const [popupState, setPopupState] = useState(false);

	if (!state.loggedIn)
		return (
			<>
				<div>
					<Link to='/'>Home</Link>
					<Link to='#' onClick={() => setPopupState(popupState === 'login' ? false : 'login')}>Log in</Link>
				</div>
				{popupState === 'login' ? <LoginPopup state={state} setState={setState} setPopupState={setPopupState} /> : null}
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
