import React from 'react';

// const generateRandomId = () => Math.floor(1 + Math.random());

const InputWithLabel = ({
	type, name, label, state, setState
}) => {
	// const id = generateRandomId();

	const eventHandler = event => {
		setState(event.target.value);
	};

	const inputField = type === 'textarea' ?
		<textarea name={name} onChange={event => eventHandler(event)}>{state}</textarea> :
		<input type={type} name={name} value={state} onChange={event => eventHandler(event)}/>;

	return (
		<div>
			<label htmlFor={name}>{label}</label>
			{inputField}
		</div>
	);
};

export default InputWithLabel;