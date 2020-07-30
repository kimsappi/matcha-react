import React from 'react';

// const generateRandomId = () => Math.floor(1 + Math.random());

const CustomInputField = ({type, name, label, state, setState, eventHandler, step = 1}) => {
	if (type === 'textarea')
		return <textarea name={name} onChange={event => eventHandler(event)} value={state} />;
	else if (type === 'number')
		return <input type={type} name={name} value={state} onChange={event => eventHandler(event)} step={step} />;
	else
		return <input type={type} name={name} value={state} onChange={event => eventHandler(event)} />;

};

const InputWithLabel = ({type, name, label, state, setState, step}) => {
	// const id = generateRandomId();

	const eventHandler = event => {
		setState(event.target.value);
	};

	return (
		<div>
			<label htmlFor={name}>{label}</label>
			<CustomInputField type={type} name={name} label={label} state={state} setState={setState} eventHandler={eventHandler} step={step} />
		</div>
	);
};

export default InputWithLabel;
