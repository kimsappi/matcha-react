import React from 'react';

export const Popup = ({children, setPopupState}) => {
	const backGround =
	{
		width: '100%',
		height: '100%',
		backgroundColor: 'rgba(0, 0, 0, 0.6)',
		position: 'fixed',
		top: '0',
		justifyContent: 'center',
		alignItems: 'center'
	}
	const box =
	{
		width: '25%',
		height: '30%',
		backgroundColor: 'white',
		position: 'relative',
		borderRadius: '10px',
		padding: '20px',
		textAlign: 'center',
		top: '30%',
		left: '50%',
		transform: 'translate(-50%, -50%)'
	};

	const closeButton =
	{
		height: '27px',
		width: '27px',
		position: 'absolute',
		top: '-15px',
		right: '-15px',
		backgroundColor: 'white',
		borderRadius: '15px',
		border: '1px solid gray',
		boxShadow: '6px 6px 29px -4px rgba(0, 0, 0, 0.75)',
		cursor: 'pointer'
	}

	return (
		<>
			<div style={backGround}>
				<div style={box}>
					{children}
					<button onClick={() => {setPopupState(false)}} style={closeButton}>X</button>
				</div>
			</div>
		</>
	);
};
// position: 'absolute',
// 		top: '100px',
// 		left: '100px',
// 		zIndex: '9',
// 		backgroundColor: 'white',
// 		border: '1px solid black',
// 		padding: '1em'