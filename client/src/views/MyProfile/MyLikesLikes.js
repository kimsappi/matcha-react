import React, {useEffect, useState} from 'react';
import {getThisPage, generateImageUrl} from '../../modules/httpQueries';

// Databasen 'likes' tableen lisattava id columni, jotta key helpompi saada uniikiksi.

// USERS I HAVE LIKED
const MyLikesLikes = ({likes, modifyPreview, modifyWho, rerenderTrick}) => {

    const smallPic = 
    {
        height: '30px'
    }

    function changePreview(profile)
    {
        if (profile.likee)
        {
        getThisPage('/profile/' + profile.likee)
			.then(response => {
				//console.log('myProfiles/likes response:');
				//console.log(response);
                modifyPreview(response);
            });
        }
        else
        {
            console.log(profile);
            getThisPage('/profile/' + profile.visitee)
			.then(response => {
				//console.log('myProfiles/likes response:');
				//console.log(response);
                modifyPreview(response);
            });
        }
    }


console.log(likes);

    if (!likes)
    {
        return(<h1>Loading</h1>);
    }
    else
    {
        return ( 
            likes.map( (like) =>
            <>
                <button className="btn btn-success" onClick={() => {changePreview(like); modifyPreview(like); modifyWho(1);}} style={{width: '80%', marginRight: '50px', marginBottom: '20px'}}>
                    {like.visiteePic ? <img src={generateImageUrl(like.visiteePhoto)} style={smallPic} /> : <img src={generateImageUrl(like.likeePhoto)} style={smallPic} /> }
                    <b>  {like.likeeUsername ? like.likeeUsername : like.visiteeUsername}</b>
                </button>
                <br />
            </>)
        ) 
    }
}

export default MyLikesLikes;