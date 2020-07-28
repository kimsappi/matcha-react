import React from 'react';

const Suggestions = ({users}) => {
	const userCards = users.map(element => <div>{element.username}</div>);
	return userCards;
};

export default Suggestions;
