import React from 'react';
import {Link} from 'react-router-dom';

import {generateImageUrl, fallbackImageUrl} from '../../modules/httpQueries';

const UserCard = ({profile}) => {
	return (
		<Link to={'/profile/' + profile.id} distance={profile.distance} key={profile.id}>
			<img alt='User' src={generateImageUrl(profile.filename)} onError={event => fallbackImageUrl(event)}/>
			<div key={profile.id}>{profile.username}</div>
		</Link>
	);
};

export default UserCard;
