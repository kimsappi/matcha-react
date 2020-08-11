import React from 'react';
import {Link} from 'react-router-dom';

import {generateImageUrl, fallbackImageUrl} from '../../modules/httpQueries';

const UserCard = ({profile, preview}) => {

	const suggestionImage = 
	{
		maxHeight: '20px',
		maxWidth: '20px'
	}

	return (
		<>
		<button onClick={() => {preview(profile.id)}}>
			<img alt='User' src={generateImageUrl(profile.filename)} onError={event => fallbackImageUrl(event)} style={suggestionImage} />
			<div key={profile.id}>{profile.username} [{profile.online ? 'online' : 'offline'}]</div>
			<div>Age: {profile.age}</div>
			<div>Tags: {profile.tags_string}</div>
			<div>Common tags: {profile.commonTags}</div>
			<div>Distance: {profile.distance}</div>
		</button>
		<br />
		</>
	);
};

export default UserCard;
