import React, {useEffect, useState} from 'react';
import ProfileNav from './ProfileNav';

import {getThisPage} from '../../modules/httpQueries';
import {Link} from 'react-router-dom';

const MyVisits = ({state, setState}) => {	
	const [profileState, setProfileState] = useState(null);
	useEffect(() => {
		getThisPage(window.location.pathname)
			.then(response => {
				console.log('Profile response:');
				console.log(response);
				//setProfileState(response);
			});
	}, []);

	if (profileState)
		return (<>
		<ProfileNav />
		
			<h1>My likes</h1>
		</>);

	else
		return (
        <>
            <ProfileNav />
			<h1>Profile empty</h1>
            <h1>Serverille 'myProfile/visits'</h1>
        </>
        );
};

export default MyVisits;