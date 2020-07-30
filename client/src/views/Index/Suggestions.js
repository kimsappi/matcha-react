import React from 'react';
import {Link} from 'react-router-dom';

import {generateImageUrl, fallbackImageUrl} from '../../modules/httpQueries';

const Suggestions = ({users, distanceFilter}) => {
	if (!users.length)
		return <div>There are currently no suggestions available for you!</div>;
	const userCards = users.map(element => {
		console.log(element.distance);
		if (element.distance < distanceFilter)
			return (
				<Link to={'/profile/' + element.id}>
					<img alt='User' src={generateImageUrl(element.filename)} onError={event => fallbackImageUrl(event)}/>
					<div key={element.id}>{element.username}</div>
				</Link>
			);
		return (<></>);
	});
	return userCards;
};

export default Suggestions;
