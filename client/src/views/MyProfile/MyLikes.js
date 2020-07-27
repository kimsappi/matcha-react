import React, {useEffect, useState} from 'react';
import ProfileNav from './ProfileNav';

import {getThisPage} from '../../modules/httpQueries';
import {Link} from 'react-router-dom';

const MyLikes = ({state, setState}) => {	
	const [profileState, setProfileState] = useState(null);
	useEffect(() => {
		getThisPage(window.location.href)
			.then(response => {
				console.log('myProfiles/likes response:');
				console.log(response);
				// setProfileState(response);
			});
	}, []);

	if (profileState)
		return (<>
		<ProfileNav />
		
			<h1>My likes</h1>
			<h2>{profileState.userData.first_name} {profileState.userData.last_name}</h2>
		</>);

	else
		return (
        <>
            <ProfileNav />
			<h1>Profile empty</h1>
            <h1>Serverille 'myProfile/likes'</h1>
        </>
        );
};

export default MyLikes;