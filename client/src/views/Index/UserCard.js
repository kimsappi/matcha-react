import React from 'react';
import {Link} from 'react-router-dom';

import {generateImageUrl, fallbackImageUrl} from '../../modules/httpQueries';

const UserCard = ({profile}) => {
	return (
		<Link to={'/profile/' + profile.id} distance={profile.distance} key={profile.id}>
			<img alt='User' src={generateImageUrl(profile.filename)} onError={event => fallbackImageUrl(event)}/>
			<div key={profile.id}>{profile.username} [{profile.online ? 'online' : 'offline'}]</div>
			<div>Age: {profile.age}</div>
			<div>Tags: {profile.tags_string}</div>
			<div>Common tags: {profile.commonTags}</div>
		</Link>
	);
};

export default UserCard;
