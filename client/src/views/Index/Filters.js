import React, {useState} from 'react';

import {Range} from 'rc-slider';
import 'rc-slider/assets/index.css';

const Filters = ({distance, setDistance,
	minAge, setMinAge, maxAge, setMaxAge,
	minCommonTags, setMinCommonTags,
	sort, setSort, sortingMethods,
	tagSearch, setTagSearch}) => {

	const [tagSearchInput, setTagSearchInput] = useState('');

	const eventHandler = (event, setFunction) => {
		setFunction(event.target.value);
	};

	const rangeEventHandler = (values, setMin, setMax) => {
		setMin(values[0]);
		setMax(values[1]);
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
		<Range
			step={1}
			value={[minAge, maxAge]}
			min={16}
			max={99}
			onChange={values => rangeEventHandler(values, setMinAge, setMaxAge)}
		/>
		<div>
			<label htmlFor='minAge'>Minimum age</label>
			<input type='number' name='minAge' value={minAge} min='16' onChange={event => eventHandler(event, setMinAge)} />
		</div>
		<div>
			<label htmlFor='minAge'>Maximum age</label>
			<input type='number' name='maxAge' value={maxAge} max='99' onChange={event => eventHandler(event, setMaxAge)} />
		</div>
		<div>
			<label htmlFor='minCommonTags'>Minimum common tags</label>
			<input type='number' name='minCommonTags' value={minCommonTags} min='0' max='16' onChange={event => eventHandler(event, setMinCommonTags)} />
		</div>
		<div>
			<label htmlFor='tagSearch'>Tag search</label>
			<input type='text' name='tagSearch' value={tagSearchInput} onChange={event => eventHandler(event, setTagSearchInput)} />
			<button onClick={() => setTagSearch(tagSearchInput)}>Search</button>
			<button onClick={() => {setTagSearch(''); setTagSearchInput('');}}>Reset</button>
		</div>
		</>
	);
};

export default Filters;
