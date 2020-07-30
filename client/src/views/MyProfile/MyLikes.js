import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Table from 'react-bootstrap/Table'
import ProfileNav from './ProfileNav';
import Likes from './MyLikesLikes';
import Likee from './MyLikesLikee';
import {Popup} from '../../components/Popup';

import {getThisPage, generateImageUrl} from '../../modules/httpQueries';

const MyLikes = ({state, setState}) => {

    const [likesState, setLikesState] = useState(null);
    const [previewState, modifyPreviewState] = useState(null);
    const [previewLikedWhoState, modifyPreviewLikedWhoState] = useState(null);
    const [previewImage, modifyPreviewImage] = useState(null);
    const [imagePopupState, modifyImagePopupState] = useState(false);

    const mainPicStyle = 
    {
        width: '200px',
        borderRadius: '100px'
    }

    const smallPicStyle =
    {
        width: '50px',
        margin: '30px'
    }

    // Remove all default stylings from the button, that the image is just a button
    const imageButton =
    {
        background: 'none',
        color: 'inherit',
        border: 'none',
        padding: '0',
        font: 'inherit',
        cursor: 'pointer',
        outline: 'inherit'
    }

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
    console.log("imagepreview" + previewImage);
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
                <div className="col-sm-5" style={{margin: '20px', justifyContent: 'center', textAlign: 'center', paddingTop: '10px'}}>

                    
                        
                        {previewState && previewState.profileData ?
                            <>
                                <h1>{previewState.profileData.username}, {previewState.profileData.age}</h1>
                                <h3>{previewState.gender}</h3>
                                <div style={{width: '100%'}}>
                                    <button onClick={() => {modifyPreviewImage(previewState.profileData.main_pic); modifyImagePopupState(true);}}  style={imageButton}>
                                        <img src={generateImageUrl(previewState.profileData.main_pic, 'png')} style={mainPicStyle}/>
                                    </button>
                                </div>
                                {previewState.images.map( (image) => 
                                    <>
                                        {image.id !== previewState.profileData.main_pic ?
                                        <button onClick={() => {modifyPreviewImage(image.id); modifyImagePopupState(true);}} style={imageButton}>
                                            <img src={generateImageUrl(image.id, image.extension)} style={smallPicStyle}/>
                                        </button>
                                        : null}
                                    </>
                                )};
                                <p>{previewState.profileData.biography}</p>
                            </>
                        : null}
                        {imagePopupState === true ?
                        <Popup setPopupState={modifyImagePopupState}><img src={generateImageUrl(previewImage, 'png')}/></Popup>
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