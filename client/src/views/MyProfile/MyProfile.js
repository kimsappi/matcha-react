import React, {useEffect, useState} from 'react';
import ProfileNav from './ProfileNav';
import MyProfileInfo from './MyProfileInfo';
import MyProfileImages from './MyProfileImages';

import {getThisPage} from '../../modules/httpQueries';
import {Link} from 'react-router-dom';

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
		<ProfileNav />
		<div className="row">
			<div className="col-sm-6">
				<MyProfileInfo profile={profileState} />
			</div>
			<div className="col-sm-6">
				<MyProfileImages profile={profileState} />
			</div>
		</div>
		
			<h1>My profile</h1>
			<h2>{profileState.userData.first_name} {profileState.userData.last_name}</h2>
		</>);

	else
		return (
			<h1>Profile empty</h1>
		);
};

export default MyProfile;
