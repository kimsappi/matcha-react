import React, {useEffect, useState} from 'react';

import {getThisPage} from '../../modules/httpQueries';

const MyProfile = ({state, setState}) => {	
	const [profileState, setProfileState] = useState(null);
	useEffect(() => {
		getThisPage(window.location.href)
			.then(response => {
				console.log('Profile response:');
				console.log(response);
				setProfileState(response);
			});
	}, []);

	if (profileState)
		return (<>
			<h1>My profile</h1>
			<h2>{profileState.userData.first_name} {profileState.userData.last_name}</h2>
		</>);

	else
		return (
			<h1>Profile empty</h1>
		);
};

export default MyProfile;
