import React from 'react';
import {Link} from 'react-router-dom';

import {LoginPopup} from './LoginPopup';
import {RegisterPopup} from './RegisterPopup';
import {ForgotPopup} from './ForgotPopup';
import {ResetPopup} from './ResetPopup';

import {logOut} from '../../../modules/httpQueries';
import Notifications from './Notifications';

const Nav = ({state, setState, popupState, setPopupState}) => {
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
						<Link to='#' onClick={() => setPopupState(popupState === 'login' ? false : 'login')}>Log in</Link>
					</li>
					<li className="nav-item nav-link">
						<Link to='#' onClick={() => setPopupState(popupState === 'register' ? false : 'register')}>Register</Link>
					</li>
				</ul>

				{popupState === 'login' ? <LoginPopup state={state} setState={setState} setPopupState={setPopupState} /> : null}
				{popupState === 'register' ? <RegisterPopup state={state} setState={setState} setPopupState={setPopupState} /> : null}
				{popupState === 'forgotPassword' ? <ForgotPopup state={state} setState={setState} setPopupState={setPopupState} /> : null}
				{popupState === 'resetPassword' ? <ResetPopup state={state} setState={setState} setPopupState={setPopupState} /> : null}
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
						<Notifications />
					</li>
					<li className="nav-item nav-link">
						<Link to='#' onClick={() => logOut(setState)}>Log out</Link>
					</li>
					<li className="nav-item nav-link">
						<Link to='#' onClick={() => logOut(setState, true)}>Log out all instances</Link>
					</li>
				</ul>
			</>
		);
};

export default Nav;
