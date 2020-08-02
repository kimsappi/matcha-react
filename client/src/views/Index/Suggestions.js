import React from 'react';

const Suggestions = ({users, distanceFilter}) => {

	const suggestionImage = 
		{
			maxHeight: '20px',
			maxWidth: '20px'
		}

	if (!users.length)
		return <div>There are currently no suggestions available for you!</div>;

	const userCards = users.filter(element => {
		console.log(element);
		if (element.props.profile.distance > distanceFilter) {
			return false;
		};
		return true;
	});

	if (!userCards.length)
		return (<div>There are some profiles available for you, but the current filters are too strict!</div>);

	return userCards;
};

export default Suggestions;
