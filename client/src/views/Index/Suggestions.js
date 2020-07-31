import React from 'react';

const Suggestions = ({users, distanceFilter}) => {
	if (!users.length)
		return <div>There are currently no suggestions available for you!</div>;
	const userCards = users.map(element => {
		console.log(element);
		if (element.props.profile.distance < distanceFilter) {
			return element;
		};
		return ('');
	});
	return userCards;
};

export default Suggestions;
