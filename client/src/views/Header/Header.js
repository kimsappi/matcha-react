import React, {useState} from 'react';

import Nav from './components/Nav';
import { Redirect } from 'react-router-dom';

const CollapsedNotificationCount = ({count}) => {
	const collapsedNotificationsNotifierStyle = {
		position: 'absolute',
		top: '-3px',
		right: '-10px',
		backgroundColor: 'red',
		color: 'cyan',
		borderRadius: '50%',
		height: '12px',
		width: '12px'
	};

	if (!count)
		return '';
	else
		return <div style={collapsedNotificationsNotifierStyle}></div>;
};

const Header = props => {
	const [unreadNotificationsCount, setUnreadNotificationsCount] = useState(0);

	return (
		<nav className="navbar navbar-expand-md navbar-light bg-light">
			<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
				<span className="navbar-toggler-icon" style={{position: 'relative'}}>
					<CollapsedNotificationCount count={unreadNotificationsCount} />
				</span>
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
