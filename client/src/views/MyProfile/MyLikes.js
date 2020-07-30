import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Table from 'react-bootstrap/Table'

import ProfileNav from './ProfileNav';
import Likes from './MyLikesLikes';
import Likee from './MyLikesLikee';

import {getThisPage} from '../../modules/httpQueries';


const MyLikes = ({state, setState}) => {

    const [likesState, setLikesState] = useState(null);
    const [previewState, modifyPreviewState] = useState(null);
    const [previewLikedWhoState, modifyPreviewLikedWhoState] = useState(null);
	useEffect(() => {
		getThisPage(window.location.pathname)
			.then(response => {
				console.log('myProfiles/likes response:');
				console.log(response);
				setLikesState(response);
			});
	}, []);
    console.log({previewState});
    console.log("ASD");
	if (likesState)
		return (
        <>  
            <ProfileNav />
                <h1>Likes</h1>
                <div className="row">
                    <div className="col-sm-6">
                        <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" className="w-80" style={{margin: '20px'}}>
                            <Tab eventKey="home" title="Users you have liked" className="w-80" style={{margin: '20px', maxHeight: '800px', overflowY: 'scroll'}}>
                                <Likes likes={likesState.liked} modifyPreview={modifyPreviewState} modifyWho={modifyPreviewLikedWhoState}/>
                            </Tab>
                            <Tab eventKey="profile" title="Users that have liked you" className="w-80" style={{margin: '20px', maxHeight: '800px', overflowY: 'scroll'}}>
                                <Likee likes={likesState.likedMe} modifyPreview={modifyPreviewState} modifyWho={modifyPreviewLikedWhoState}/>
                            </Tab>
                        </Tabs>
                    </div>
                <div className="col-sm-5" style={{margin: '20px', justifyContent: 'center', textAlign: 'center'}}>

                    
                    {previewLikedWhoState === 1 ? 
                    <>
                        <h1>(Profile pic here..)</h1>
                        <h5>(other images here..)</h5>
                        <h1>Username: {previewState.likeeUsername}</h1>
                        <h2>UserId: {previewState.likee}</h2>
                        <Link to={'/profile/' + previewState.likee}>
                            <div key={previewState.likee}>View profile</div>
                        </Link>
                    </>
                    : ''}
                    {previewLikedWhoState === 2 ?
                    <>
                        <h1>(Profile pic here..)</h1>
                        <h5>(other images here..)</h5>
                        <h1>Username: {previewState.likerUsername}</h1>
                        <h2>UserId: {previewState.liker}</h2>
                        <Link to={'/profile/' + previewState.liker}>
                            <div key={previewState.liker}>View profile</div>
                        </Link>
                    </>
                    : ''}
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

export default MyLikes;