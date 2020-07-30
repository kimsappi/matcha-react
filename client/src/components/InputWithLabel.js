import React from 'react';

// const generateRandomId = () => Math.floor(1 + Math.random());

const InputWithLabel = ({
	type, name, label, state, setState
}) => {
	// const id = generateRandomId();

	const eventHandler = event => {
		setState(event.target.value);
	};

	return (
		<div>
			<label htmlFor={name}>{label}</label>
			<input type={type} name={name} value={state} onChange={event => eventHandler(event)}/>
		</div>
	);
};

export default InputWithLabel;