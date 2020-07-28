import React, {useState, useEffect} from 'react';

import Suggestions from './Suggestions';
import {getThisPage} from '../../modules/httpQueries';

const Index = ({state}) => {
	const [users, setUsers] = useState([]);

	useEffect(() => {
		getThisPage(window.location.pathname)
			.then(response => {
				console.log('/ search response:');
				console.log(response);
				response = response || [];
				setUsers(response);
			});
	}, []);

	if (state.loggedIn)
		return (
			<div>
				<div className="row">
					<div className="col-sm-6 h-25" id="suggestionContainer">
						<Suggestions users={users} />
						<h1>asd</h1>
					</div>
					<div className="col-sm-6 h-25" id="searchContainer">
						<h1>User search</h1>
					</div>
					
				</div>
				
			</div>
		);

	else
		return(
			<div>Log in</div>
		);
};

export default Index;
