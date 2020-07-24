import React from 'react';

import Nav from './Nav';
import NavLoggedIn from './NavLoggedIn';

const Header = props => {
	console.log(props);
	if (props.state.loggedIn)
		return (
			<NavLoggedIn />
		);
	else
		return (<Nav />);
};

export default Header;
