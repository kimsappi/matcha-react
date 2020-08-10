import React, {useState, useEffect} from 'react';

import Suggestions from './Suggestions';
import Filters from './Filters';
import {getThisPage, submitConfirmEmailOrResetPassword, parseSearchString} from '../../modules/httpQueries';
import PopupTest from './PopupTest';
import UserCard from './UserCard';
import {getUser} from '../../modules/userData';

import {sortingMethods} from '../../config.json';

const Index = ({state, action, setPopupState}) => {
	const userData = getUser();
	// Userdata doesn't load instantly, so set a default to prevent errors
	const age = userData.age ? userData.age : 25;

	const [users, setUsers] = useState([]);
	const [distanceFilter, setDistanceFilter] = useState(100);
	const [minAge, setMinAge] = useState(age - 3);
	const [maxAge, setMaxAge] = useState(age + 3);
	const [minCommonTags, setMinCommonTags] = useState(0);
	const [sort, setSort] = useState(0);
	const [tagSearch, setTagSearch] = useState('');

	if (action === 'resetPassword')
		setPopupState('resetPassword');

	const generateUserCards = users => {
		if (!users || !users.length)
			return '';
		return users.map(user => <UserCard key={user.id} profile={user} />);
	};

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
					setUsers(generateUserCards(response));
				});
	}, [action, setPopupState]);

	if (state.loggedIn)
		return (
			<div>
				<div className="row">
					<div className="col-md-6 h-25 order-md-2" id="searchContainer">
						<h1 class='d-md-none' data-toggle="collapse" data-target="#filtersCollapse">Filters</h1>
						<h1 class='d-none d-md-block'>Filters</h1>
						<div class='collapse d-md-block' id='filtersCollapse'>
							<Filters
								distance={distanceFilter} setDistance={setDistanceFilter}
								minAge={minAge} setMinAge={setMinAge}
								maxAge={maxAge} setMaxAge={setMaxAge}
								minCommonTags={minCommonTags} setMinCommonTags={setMinCommonTags}
								sort={sort} setSort={setSort} sortingMethods={sortingMethods}
								tagSearch={tagSearch} setTagSearch={setTagSearch}
							/>
						</div>
					</div>
					<div className="col-md-6 h-25 order-md-1" id="suggestionContainer">
						<h1>Suggestions</h1>
						<Suggestions
							users={users} distanceFilter={distanceFilter}
							minAge={minAge} maxAge={maxAge}
							minCommonTags={minCommonTags}
							sort={sortingMethods[sort]}
							tagSearch={tagSearch}
						/>
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
