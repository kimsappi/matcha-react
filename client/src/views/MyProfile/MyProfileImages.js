import React, {useEffect, useState} from 'react';

import MyProfileImage from './MyProfileImage';

import {uploadPhoto} from '../../modules/httpQueries';

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

    return (
        <>
        <label htmlFor='photoUpload'>Upload a photo</label>
        <input type='file' name='photoUpload' onChange={event => uploadPhotos(event)} multiple />
        <p>Printed from MyProfileImages-component</p>
        {profile.images.length ?
            profile.images.map(photo => <MyProfileImage photo={photo} key={photo.id} />) :
            <p>You haven't uploaded any images!</p>}
        </>
        );
}

export default MyProfileImages;