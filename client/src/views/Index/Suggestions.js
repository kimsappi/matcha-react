import React from 'react';
import {Link} from 'react-router-dom';

const Suggestions = ({users}) => {
	if (!users.length)
		return <div>There are currently no suggestions available for you!</div>;
	const userCards = users.map(element => 
		<Link to={'/profile/' + element.id}>
			<div key={element.id}>{element.username}</div>
		</Link>
	);
	return userCards;
};

export default Suggestions;
