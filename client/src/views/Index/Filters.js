import React from 'react';

const Filters = ({distance, setDistance}) => {

	const eventHandler = event => {
		setDistance(event.target.value);
	};

	return (
		<>
		<label for='distance'>Maximum distance</label>
		<input type='range' name='distance' value={distance} max='9000' onChange={event => eventHandler(event)} />
		<input type='number' name='distance' value={distance} max='9000' onChange={event => eventHandler(event)} />
		</>
	);
};

export default Filters;
