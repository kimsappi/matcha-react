import React, {useState} from 'react';
import {Link} from 'react-router-dom';

import {LoginPopup} from './LoginPopup';

import {logOut} from '../../../modules/httpQueries';

const Nav = ({state, setState}) => {
	const [popupState, setPopupState] = useState(false);

	if (!state.loggedIn)
		return (
			<>
				<li class="nav-item">
					<Link to='/'>Home</Link>
				</li>
				<li class="nav-item">
					<Link to='#' onClick={() => setPopupState(popupState === 'login' ? false : 'login')}>Log in</Link>
				</li>
				{popupState === 'login' ? <LoginPopup state={state} setState={setState} setPopupState={setPopupState} /> : null}
			</>
		);

	else
		return (
			<>
				<p>{state.username}</p>
				<li class="nav-item active">
					<Link to='/'>Home</Link>
				</li>
				<li class="nav-item active">
					<Link to='/myProfile/profile'>Profile</Link>
				</li>
				<li class="nav-item active">
					<Link to='#' onClick={() => logOut(state, setState)}>Log out</Link>
				</li>
			</>
		);
};

export default Nav;
