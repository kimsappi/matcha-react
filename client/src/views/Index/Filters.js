import React from 'react';

const Filters = ({filters, setFilters}) => {

	const eventHandler = event => {
		console.log(event.target.value);
		setFilters(event.target.value);
	};

	return (
		<>
		<label for='distance'>Distance</label>
		<input type='range' name='distance' value={filters.distance} max='9000' onChange={event => eventHandler(event, setFilters)} />
		</>
	);
};

export default Filters;
