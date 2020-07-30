import React, {useState, useEffect} from 'react';

import Suggestions from './Suggestions';
import Filters from './Filters';
import {getThisPage, submitConfirmEmailOrResetPassword, parseSearchString} from '../../modules/httpQueries';
import PopupTest from './PopupTest';


const Index = ({state, action, setPopupState}) => {
	const [users, setUsers] = useState([]);
	const [distanceFilter, setDistanceFilter] = useState(100);
	if (action === 'resetPassword')
		setPopupState('resetPassword');

	useEffect(() => {
		if (action === 'confirmEmail') {
			const searchObj = parseSearchString(window.location.search);
			console.log(searchObj);
			if (!searchObj || !searchObj.user || !searchObj.token)
				return;
			if (submitConfirmEmailOrResetPassword(searchObj, action)) {
				setPopupState('login');
				window.location.href = '/';
			}
		}
		else if (!action)
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
						<h1>Suggestions</h1>
						<Suggestions users={users} distanceFilter={distanceFilter} />
					</div>
					<div className="col-sm-6 h-25" id="searchContainer">
						<h1>User search</h1>
						<Filters filters={distanceFilter} setFilters={setDistanceFilter} />
					</div>
					<PopupTest />
				</div>
				
			</div>
		);

	else
		return(
			<div>Log in</div>
		);
};

export default Index;
