import React, {useEffect, useState} from 'react';
import ProfileNav from './ProfileNav';
import MyProfileInfo from './MyProfileInfo';
import MyProfileImages from './MyProfileImages';

import {getThisPage} from '../../modules/httpQueries';



const MyProfile = ({state, setState}) => {	
	const [profileState, setProfileState] = useState(null);
	useEffect(() => {
		getThisPage(window.location.pathname)
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
			<>
			<ProfileNav />
			<h1></h1>
			</>
		);
};

export default MyProfile;
