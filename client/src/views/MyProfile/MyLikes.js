import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Table from 'react-bootstrap/Table'
import ProfileNav from './ProfileNav';
import Likes from './MyLikesLikes';
import Likee from './MyLikesLikee';
import {Popup} from '../../components/Popup';

import {getThisPage, generateImageUrl, submitLike} from '../../modules/httpQueries';

const MyLikes = ({state, setState}) => {

    const [likesState, setLikesState] = useState(null);
    const [previewState, modifyPreviewState] = useState(null);
    const [previewLikedWhoState, modifyPreviewLikedWhoState] = useState(null);
    const [previewImage, modifyPreviewImage] = useState(null);
    const [imagePopupState, modifyImagePopupState] = useState(false);
    const [rerenderTrick, setRerenderTrick] = useState(false);

    
    var arr = []; 

    var blockFilter = {display: 'block'};
    if (previewState)
    {
        if (previewState.blockStatus == false)
        {
            blockFilter = 
            {
                
            }
        }
        else
        {
            blockFilter = 
            {
                position: 'absolute',
                margin: '0',
                padding: '0',
                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '100%',
                backgroundSize: 'cover',
                WebkitFilter: 'blur(4px)',
                MozFilter: 'blur(4px)',
                MsFilter: 'blur(4px)',
                OFilter: 'blur(4px)',
                filter: 'blur(4px)',
                Zindex: '13'
            }
        }
    }

    const mainPicStyle = 
    {
        maxWidth: '100%',
        maxHeight: '100%',
        borderRadius: '100px'
    }

    const smallPicStyle =
    {
        maxWidth: '120px',
        maxHeight: '100px',
        padding: '20px'
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

    const popUpImage = 
    {
        maxWidth: '100%',
        maxHeight: '100%',
    }

	useEffect(() => {
        console.log("USE");
		getThisPage(window.location.pathname)
			.then(response => {
				//console.log('myProfiles/likes response:');
				//console.log(response);
                setLikesState(response);
            });
        if (previewState)
        {
            console.log("jees")
            getThisPage('/profile/'+previewState.profileData.id)
                .then(response => {
                    modifyPreviewState(response);
                    
                });
        }
    }, [rerenderTrick]);


    
    console.log(" TASSA PREVIEWSTATE");
    console.log(previewState);
    console.log(rerenderTrick);

    //console.log("imagepreview" + previewImage);
    if (likesState)
    
		return (
            
        <>  
        
            <ProfileNav />
                <h1>Likes</h1>
                <div className="row">
                    <div className="col-sm-6">
                        <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" className="w-80" style={{margin: '20px'}}>
                            <Tab eventKey="home" title="Users you have liked" className="w-80" style={{margin: '20px', maxHeight: '800px', overflowY: 'scroll'}}>
                                <Likes likes={likesState.liked} modifyPreview={modifyPreviewState} modifyWho={modifyPreviewLikedWhoState} render={rerenderTrick}/>
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
                                {previewState ? 
                                previewState.blockStatus === true ? 
                                <h1 style={{position: 'relative', top: '14px', textAlign: 'center', fontWeight: 'bolder', fontSize: '60px', color: 'red'}}>BLOCKED</h1> : ""
                                    
                                    : ''}

                                <div style={{width: '100%'}}>
                                    <button onClick={() => {modifyPreviewImage(previewState.profileData.filename); modifyImagePopupState(true);}}  style={imageButton}>
                                        <img src={generateImageUrl(previewState.profileData.filename)} style={mainPicStyle}/>
                                    </button>
                                </div>
                                {previewState.images.map( (image) => 
                                    <>
                                        {image !== previewState.profileData.filename ?
                                        <button onClick={() => {modifyPreviewImage(image); modifyImagePopupState(true);}} style={imageButton}>
                                            <img src={generateImageUrl(image)} style={smallPicStyle}/>
                                        </button>
                                        : null}
                                    </>
                                )}
                                <p>{previewState.profileData.biography}</p>
                                            
                                <h4>{previewState.profileData.tags_string}</h4>
                                
                                {/* {previewState.profileData.tags_string.split(',').map((word) => {<h1>{word}</h1>})} */}

                                {previewState && previewState.blockStatus === false ? 
                                <button onClick={() => submitLike('/profile/'+previewState.profileData.id, previewState.likeButton, rerenderTrick, setRerenderTrick)} className="btn btn-success">{previewState.likeButton}</button>
                                : ''}
                                {previewState ? 
                                <button onClick={() => submitLike('/profile/'+previewState.profileData.id, previewState.blockStatus === true ? "unblock" : "block", rerenderTrick, setRerenderTrick)} className="btn btn-danger">{previewState.blockStatus === true ? "Unblock user" : "Block user"}</button>
                                : ''} 

                            </>
                        : null}
                        {imagePopupState === true ?
                        <Popup setPopupState={modifyImagePopupState}><img src={generateImageUrl(previewImage)} style={popUpImage}/></Popup>
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
