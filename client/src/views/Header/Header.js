import React, {useState} from 'react';

import Nav from './components/Nav';

const Header = props => {
	const [unreadNotificationsCount, setUnreadNotificationsCount] = useState(0);
	return (
		<nav className="navbar navbar-expand-lg navbar-light bg-light">
			<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
				<span className="navbar-toggler-icon"></span>
			</button>
			<div className="collapse navbar-collapse" id="navbarSupportedContent">
    			
					<Nav state={props.state} setState={props.setState}
					popupState={props.popupState} setPopupState={props.setPopupState}
					unreadNotificationsCount={unreadNotificationsCount} setUnreadNotificationsCount={setUnreadNotificationsCount}
					/>
			</div>
		</nav>
	);
};

export default Header;
