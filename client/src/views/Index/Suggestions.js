import React from 'react';

const Suggestions = ({users, distanceFilter, minAge, maxAge, sort}) => {

	const suggestionImage = 
		{
			maxHeight: '20px',
			maxWidth: '20px'
		}

	if (!users.length)
		return <div>There are currently no suggestions available for you!</div>;

	const userCards = users.filter(element => {
		//console.log(element);
		if (element.props.profile.distance > distanceFilter)
			return false;
		if (element.props.profile.age < minAge)
			return false;
		if (element.props.profile.age > maxAge)
			return false;
		return true;
	});

	if (!userCards.length)
		return (<div>There are some profiles available for you, but the current filters are too strict!</div>);

	return userCards.sort((a, b) => {
		return a.props.profile[sort.key] * sort.order - b.props.profile[sort.key];
	});
};

export default Suggestions;
