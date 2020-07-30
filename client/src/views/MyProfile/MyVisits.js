import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Table from 'react-bootstrap/Table'

import ProfileNav from './ProfileNav';

import {getThisPage} from '../../modules/httpQueries';
import Likes from './MyLikesLikes';
import Likee from './MyLikesLikee';

const MyVisits = ({state, setState}) => {

    const [visitsState, setVisitsState] = useState(null);
    const [previewState, modifyPreviewState] = useState(null);
    const [previewLikedWhoState, modifyPreviewLikedWhoState] = useState(null);
	useEffect(() => {
		getThisPage(window.location.pathname)
			.then(response => {
				console.log('myProfiles/visits response:');
				console.log(response);
				setVisitsState(response);
			});
	}, []);
    console.log({previewState});
    console.log("ASD");
	if (visitsState)
		return (
        <>  
            <ProfileNav />
                <h1>Visits</h1>
                <div className="row">
                    <div className="col-sm-6">
                        <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" className="w-80" style={{margin: '20px'}}>
                            <Tab eventKey="home" title="Users you have visited" className="w-80" style={{margin: '20px', maxHeight: '800px', overflowY: 'scroll'}}>
								<Likes likes={visitsState.visited} modifyPreview={modifyPreviewState} modifyWho={modifyPreviewLikedWhoState}/>
                            </Tab>
                            <Tab eventKey="profile" title="Users that have visited you" className="w-80" style={{margin: '20px', maxHeight: '800px', overflowY: 'scroll'}}>
								<Likee likes={visitsState.visitedMe} modifyPreview={modifyPreviewState} modifyWho={modifyPreviewLikedWhoState}/>
                            </Tab>
                        </Tabs>
                    </div>
                <div className="col-sm-5" style={{margin: '20px', justifyContent: 'center', textAlign: 'center'}}>

                    
                    {/* {previewLikedWhoState === 1 ? 
                    <>
                        <h1>(Main profile pic here..)</h1>
                        <h5>(other images here..)</h5>
                        <h1>Username: {previewState.visiteeUsername}</h1>
                        <h2>UserId: {previewState.visitee}</h2>
                        <Link to={'/profile/' + previewState.visitee}>
                            <div key={previewState.visitee}>View profile</div>
                        </Link>
                    </>
                    : ''}
                    {previewLikedWhoState === 2 ?
                    <>
                        <h1>(Profile pic here..)</h1>
                        <h5>(other images here..)</h5>
                        <h1>Username: {previewState.visitorUsername}</h1>
                        <h2>UserId: {previewState.visitor}</h2>
                        <Link to={'/profile/' + previewState.visitor}>
                            <div key={previewState.visitor}>View profile</div>
                        </Link>
                    </>
                    : ''}        */}
                </div>
            </div>
        </>
        );

	else
		return (
        <>
            <ProfileNav />
			<h1>Profile empty or loading</h1>
            <h1>Serverille 'myProfile/likes'</h1>
        </>
        );
};

export default MyVisits;