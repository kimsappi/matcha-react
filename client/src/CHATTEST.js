import React, { useEffect } from 'react';
import {getThisPage} from './modules/httpQueries';

const CHATTEST = () => {

	useEffect(() => {
		getThisPage('/chat?id=0')
			.then(results => console.log(results));
		getThisPage('/myProfile/notifications')
			.then(results => {
				console.log('Notifications:');
				console.log(results);
			});
	}, []);

	return (<>CHATTEST</>);
};

export default CHATTEST;
