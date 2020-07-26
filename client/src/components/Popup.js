import React from 'react';

export const Popup = ({children}) => {
	const style = {
		position: 'absolute',
		top: '100px',
		left: '100px',
		zIndex: '9'
	};

	return (
		<div style={style}>
			{children}
		</div>
	);
};