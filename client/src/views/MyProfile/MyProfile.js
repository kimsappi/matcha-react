import React, {useEffect} from 'react';

import {getThisPage} from '../../modules/httpQueries';

const MyProfile = ({state, setState}) => {	
	useEffect(() => {
		getThisPage(window.location.href)
			.then(response => {
				console.log('Profile response:');
				console.log(response);
			});
	});

	return (
		<div>
			<h1>Login page</h1>
			<label htmlFor='username' />
			<input type='text' name='username' id='username' />
			<label htmlFor='password' />
			<input type='password' name='password' id='password' />
		</div>
	);
};

export default MyProfile;
