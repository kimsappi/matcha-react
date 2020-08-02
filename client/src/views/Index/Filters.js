import React from 'react';

const Filters = ({distance, setDistance, minAge, setMinAge, maxAge, setMaxAge}) => {

	const eventHandler = (event, setFunction) => {
		setFunction(event.target.value);
	};

	return (
		<>
		<label for='distance'>Maximum distance</label>
		<input type='range' name='distance' value={distance} max='9000' onChange={event => eventHandler(event, setDistance)} />
		<input type='number' name='distance' value={distance} max='9000' onChange={event => eventHandler(event, setDistance)} />
		<label for='minAge'>Minimum age</label>
		<input type='number' name='minAge' value={minAge} min='16' onChange={event => eventHandler(event, setMinAge)} />
		<label for='minAge'>Maximum age</label>
		<input type='number' name='maxAge' value={maxAge} max='99' onChange={event => eventHandler(event, setMaxAge)} />
		</>
	);
};

export default Filters;
