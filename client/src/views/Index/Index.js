import React, {useState, useEffect} from 'react';

import Suggestions from './Suggestions';
import Filters from './Filters';
import {getThisPage, submitConfirmEmailOrResetPassword, parseSearchString, submit42Code, loginResponseHandler} from '../../modules/httpQueries';
import PopupTest from './PopupTest';
import UserCard from './UserCard';
import ProfilePreview from './ProfilePreview';
import {getUser} from '../../modules/userData';

import {sortingMethods} from '../../config.json';
import { Redirect } from 'react-router-dom';

const Index = ({state, action, setPopupState, setState}) => {
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
	const [previewId, setPreviewId] = useState(null);
	const [previewProfile, setPreviewProfile] = useState(null);

	if (previewProfile)
		console.log("EKA CONSOLE"+previewProfile.profileData.id);

	if (action === 'resetPassword')
		setPopupState('resetPassword');

	const generateUserCards = users => {
		if (!users || !users.length)
			return '';
		return users.map(user => <UserCard key={user.id} profile={user} preview={setPreviewId}/>);
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
		else if ((action === 'apiLogin' || action === 'apiRegister') && window.location.search) {
			const req = submit42Code(window.location.search.substr(6), action)
			req.then(data => {
				if (data.action === 'register') {
					localStorage.setItem('registerPrefill', JSON.stringify(data));
					setPopupState('register');
				}
				else {
					loginResponseHandler(data, setState, setPopupState);
				}
			});
		}
		else if (!action)
			getThisPage(window.location.pathname)
				.then(response => {
					console.log('/ search response:');
					console.log(response);
					response = response || [];
					setUsers(generateUserCards(response));
				});

		

		if (previewId)
		{
			getThisPage('/profile/'+previewId)
				.then(response => {
					console.log(response);
					setPreviewProfile(response);
				});
		}
	}, [action, setPopupState, previewId]);

	if (state.loggedIn)
		return (
			<div>
				<div className="row">
					<div className="col-md-6 h-25 order-md-2" id="searchContainer">
						<h1 className='d-md-none' data-toggle="collapse" data-target="#filtersCollapse">Filters</h1>
						<h1 className='d-none d-md-block'>Filters</h1>
						<div className='collapse d-md-block' id='filtersCollapse'>
							<Filters
								distance={distanceFilter} setDistance={setDistanceFilter}
								minAge={minAge} setMinAge={setMinAge}
								maxAge={maxAge} setMaxAge={setMaxAge}
								minCommonTags={minCommonTags} setMinCommonTags={setMinCommonTags}
								sort={sort} setSort={setSort} sortingMethods={sortingMethods}
								tagSearch={tagSearch} setTagSearch={setTagSearch}
							/>
							
						</div>
						<div>

							<ProfilePreview user={previewProfile}/>
							<br />
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
