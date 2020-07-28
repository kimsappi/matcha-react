import React, {useEffect, useState} from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Table from 'react-bootstrap/Table'

import ProfileNav from './ProfileNav';
import Likes from './MyLikesLikes';
import Likee from './MyLikesLikee';

import {getThisPage} from '../../modules/httpQueries';


const MyLikes = ({state, setState}) => {

    const [likesState, setLikesState] = useState(null);
    const [previewState, modifyPreviewState] = useState('1');
	useEffect(() => {
		getThisPage(window.location.pathname)
			.then(response => {
				console.log('myProfiles/likes response:');
				console.log(response);
				setLikesState(response);
			});
	}, []);

	if (likesState && previewState)
		return (
        <>
            
                <ProfileNav />
                <div className="row">
                    <div className="col-sm-6">
                    <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" className="w-80" style={{margin: '20px'}}>
                        <Tab eventKey="home" title="Users you have liked" className="w-80" style={{margin: '20px'}}>
                            <Likes likes={likesState.liked} modifyPreview={modifyPreviewState} />
                        </Tab>
                        <Tab eventKey="profile" title="Users that have liked you" className="w-80" style={{margin: '20px'}}>
                            <Likee likes={likesState.likedMe} modifyPreview={modifyPreviewState} />
                        </Tab>
                    </Tabs>
                    </div>
                <div className="col-sm-5" style={{margin: '20px'}}>
                    Viereisen listan kayttajat buttoneita, ja tahan valitun kayttajan esikatselu
                    {previewState}
                    <button onClick={() => modifyPreviewState('3')}>asd</button>
                    
                </div>
            </div>
        </>);

	else
		return (
        <>
            <ProfileNav />
			<h1>Profile empty</h1>
            <h1>Serverille 'myProfile/likes'</h1>
        </>
        );
};

export default MyLikes;