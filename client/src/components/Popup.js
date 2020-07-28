import React from 'react';

export const Popup = ({children}) => {
	const style = {
		position: 'absolute',
		top: '100px',
		left: '100px',
		zIndex: '9',
		backgroundColor: 'white',
		border: '1px solid black',
		padding: '1em'
	};

	return (
		<div style={style}>
			{children}
		</div>
	);
};
