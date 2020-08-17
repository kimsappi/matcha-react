import React, {useEffect, useState} from 'react';

import {getThisPage, generateImageUrl, submitLike} from '../../modules/httpQueries';
import {Popup} from '../../components/Popup';

/* eslint-disable */
const ProfilePreview = ({user, stateChange, setStateChange}) => {

    const [previewState, modifyPreviewState] = useState(user);

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
        Zindex: '23'
    }

    const [previewImage, modifyPreviewImage] = useState(null);
    const [imagePopupState, modifyImagePopupState] = useState(false);

    const [rerenderTrick, setRerenderTrick] = useState(false);

    useEffect(() => {
        if (user)
        {
            getThisPage('/profile/'+user.profileData.id)
                .then(response => {
                    modifyPreviewState(response);
                });
        }
    }, [user, rerenderTrick]);

        if (previewState)
            return (
                <>
                <div style={{margin: '20px', justifyContent: 'center', textAlign: 'center', paddingTop: '10px', zIndex: '-1', backgroundColor: 'lightgray', borderRadius: '170px', boxShadow: '0 0 25px 40px lightGray'}}>
                {previewState && previewState.profileData ?
                    <>
                    
                        <h1>{previewState.profileData.username}, {previewState.profileData.age}</h1>
                        <h3>{previewState.profileData.online ? 'Online' : 'Last online: ' + (previewState.profileData.last_login || 'never')}</h3>
                        <h3 style={{lineHeight: '1px'}}>{previewState.gender}</h3>
                        <h6 style={{color: 'red'}}>Fame: {previewState.profileData.fame}</h6>
                        
                        {previewState ? 
                                previewState.blockStatus === true ? 
                                <h1 style={{position: 'relative', top: '14px', textAlign: 'center', fontWeight: 'bolder', fontSize: '60px', color: 'red'}}>BLOCKED</h1> : ""
                                    
                                    : ''}

                        <div style={{width: '100%'}}>
                            <button onClick={() => {modifyPreviewImage(previewState.profileData.filename); modifyImagePopupState(true);}}  style={imageButton}>
                                <img src={generateImageUrl(previewState.profileData.filename)} style={mainPicStyle}/>
                            </button>
                        </div>
                        {previewState.images.map( (image, index) => 
                            <div key={index} style={{display: 'inline'}}>
                                {image !== previewState.profileData.filename ?
                                <button onClick={() => {modifyPreviewImage(image); modifyImagePopupState(true);}} style={imageButton}>
                                    <img src={generateImageUrl(image)} style={smallPicStyle}/>
                                </button>
                                : null}
                            </div>
                        )}
                        <p style={{overflowWrap: 'break-word'}}>{previewState.profileData.biography}</p> <br />
                        {previewState.profileData.tags_string ?
                        <>
                            {previewState.profileData.tags_string.split(',').map((tag, index) => <h5 key={index} style={{display: 'inline', color: 'red', overflowWrap: 'break-word'}}>  #{tag}</h5>)} <br />
                        </>
                        : ''}
                        {previewState && previewState.blockStatus === false ? 
                        <button onClick={() => {submitLike('/profile/'+previewState.profileData.id, previewState.likeButton, rerenderTrick, setRerenderTrick); setStateChange(!stateChange);}} className="btn btn-success">{previewState.likeButton}</button>
                        : ''}
                        {previewState ? 
                        <button onClick={() => {submitLike('/profile/'+previewState.profileData.id, previewState.blockStatus === true ? "unblock" : "block", rerenderTrick, setRerenderTrick); setStateChange(!stateChange);}} className="btn btn-danger">{previewState.blockStatus === true ? "Unblock user" : "Block user"}</button>
                        : ''} 
                       
                    </>
                : null}
                {imagePopupState === true ?
                <Popup setPopupState={modifyImagePopupState}><img src={generateImageUrl(previewImage)} style={popUpImage}/></Popup>
                : ''}
                </div>
            </>
            );
        else
            return (
                ""
            );

      
    
}

export default ProfilePreview
