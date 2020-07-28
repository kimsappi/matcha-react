import React, { useEffect, useState } from 'react';

import { getThisPage, submitLike } from '../../modules/httpQueries';

const Profile = ({match}) => {
	const [profileState, setProfileState] = useState(null);
	const [rerenderTrick, setRerenderTrick] = useState(false);

	useEffect(() => {
		getThisPage(window.location.pathname)
			.then(response => {
				console.log('profile/:id response:');
				console.log(response);
				if (!response)
					window.location.pathname = '/';
				setProfileState(response);
			});
	}, [rerenderTrick]);

	if (!profileState)
		return (
			<>
			</>
		);
	
	return (
		<>
		<h1>{profileState.profileData.first_name} {profileState.profileData.last_name[0]}. {profileState.gender}</h1>
		<div>Like button status: <button onClick={event => submitLike(window.location.pathname, event.target.innerHTML, rerenderTrick, setRerenderTrick)}>{profileState.likeButton}</button></div>
		</>
	)
}

export default Profile;
