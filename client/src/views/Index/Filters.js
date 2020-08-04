import React from 'react';

const Filters = ({distance, setDistance,
	minAge, setMinAge, maxAge, setMaxAge,
	sort, setSort, sortingMethods}) => {

	const eventHandler = (event, setFunction) => {
		setFunction(event.target.value);
	};

	const sortingMethodOptions = sortingMethods.map((method, index) => {
		return (
			<option value={index} key={method.name}>{method.display}</option>
		);
	});



	return (
		<>
		<div>
			<label htmlFor='sort'>Sort by:</label>
			<select name='sort' value={sort} onChange={event => setSort(event.target.value)}>
				{sortingMethodOptions}
			</select>
		</div>
		<h2>Filters</h2>
		<div>
			<label htmlFor='distance'>Maximum distance</label>
			<input type='range' name='distance' value={distance} max='9000' onChange={event => eventHandler(event, setDistance)} />
			<input type='number' name='distance' value={distance} max='9000' onChange={event => eventHandler(event, setDistance)} />
		</div>
		<div>
			<label htmlFor='minAge'>Minimum age</label>
			<input type='number' name='minAge' value={minAge} min='16' onChange={event => eventHandler(event, setMinAge)} />
		</div>
		<div>
			<label htmlFor='minAge'>Maximum age</label>
			<input type='number' name='maxAge' value={maxAge} max='99' onChange={event => eventHandler(event, setMaxAge)} />
		</div>
		</>
	);
};

export default Filters;
