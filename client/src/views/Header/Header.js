import React from 'react';

import Nav from './components/Nav';

const Header = props => {
	return (
		<Nav state={props.state} setState={props.setState} />
	);
};

export default Header;
