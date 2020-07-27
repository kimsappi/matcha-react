import React, {useState} from 'react';
import {Link} from 'react-router-dom';

import {LoginPopup} from './LoginPopup';

import {logOut} from '../../../modules/httpQueries';

const Nav = ({state, setState}) => {
	const [popupState, setPopupState] = useState(false);

	if (!state.loggedIn)
		return (
			<>
				<ul className="navbar-nav mr-auto">
					<li className="nav-item nav-link">
						<Link to='/'>Home</Link>
					</li>
					
				</ul>
				<ul className="navbar-nav ml-auto">
					<li className="nav-item nav-link">
						{popupState === 'login' ? <LoginPopup state={state} setState={setState} setPopupState={setPopupState} /> : null}
					</li>
					<li className="nav-item nav-link">
						<Link to='#' onClick={() => setPopupState(popupState === 'login' ? false : 'login')}>Log in</Link>
					</li>
				</ul>
			</>
		);

	else
		return (
			<>
				<ul className="navbar-nav mr-auto">
					
					<li className="nav-item nav-link">
						<Link to='/'>Home</Link>
					</li>
					<li className="nav-item nav-link">
						<Link to='/myProfile/profile'>Profile</Link>
					</li>
					
				</ul>
				<ul className="navbar-nav ml-auto">
					<li className="nav-item nav-link">
						<p>{state.username}</p>
					</li>
					<li className="nav-item nav-link">
						<Link to='#' onClick={() => logOut(state, setState)}>Log out</Link>
					</li>
				</ul>
			</>
		);
};

export default Nav;
