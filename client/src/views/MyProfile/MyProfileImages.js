import React, {useEffect, useState} from 'react';

const MyProfileImages = ({profile}) => {	

    const uploadPhoto = () => {
        return ;
    }

    return (
        <>
        <label for='photoUpload'>Upload a photo</label>
        <input type='file' name='photoUpload' onChange={uploadPhoto} />
        <p>Printed from MyProfileImages-component</p>
        <div className="row" id="MyProfilePhoto">
            photo1
        </div>
        <div className="row" id="MyProfilePhoto">
            photo2
        </div>
        <div className="row" id="MyProfilePhoto">
            photo3
        </div>

        </>
        );
}

export default MyProfileImages;