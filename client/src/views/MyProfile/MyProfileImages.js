import React, {useEffect, useState} from 'react';

import {uploadPhoto, generateImageUrl} from '../../modules/httpQueries';

const MyProfileImages = ({profile}) => {	

    const uploadPhotos = event => {
        const element = event.target;
        console.log(element.files);
        // Array.prototype.forEach.call(element.files, file => {
        //     if (file.type.startsWith('image/') && file.size < 5000000) {
        //         const res = uploadPhoto(file);
        //         console.log(res);
        //     }
        //     else
        //         alert('File ' + file.name + ' is not an image or is too large.');
        // })
                const res = uploadPhoto(element.files);
                console.log(res);
    }

    const myProfileImages = profile.images.map(photo => 
        <div className="row" id="MyProfilePhoto">
            <img src={generateImageUrl(photo.id, photo.extension)} />
        </div>
    );

    return (
        <>
        <label htmlFor='photoUpload'>Upload a photo</label>
        <input type='file' name='photoUpload' onChange={event => uploadPhotos(event)} multiple />
        <p>Printed from MyProfileImages-component</p>
        {myProfileImages}
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