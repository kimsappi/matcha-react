import React, {useEffect, useState} from 'react';

import MyProfileImage from './MyProfileImage';
import {Popup} from '../../components/Popup';

import {uploadPhoto} from '../../modules/httpQueries';
import {generateImageUrl, photoActions} from '../../modules/httpQueries';

const MyProfileImages = ({profile}) => {	
    
    const [previewImage, modifyPreviewImage] = useState(null);
    const [imagePopupState, modifyImagePopupState] = useState(false);

    const popUpImage = 
    {
        maxWidth: '100%',
        maxHeight: '100%',
    }

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
                // MITEN RES:sta SAADAAN PROMISE VALUE ULOS?
                //window.location.reload(false);
    }
console.log(profile);
    return (
        <>
        <label htmlFor='photoUpload'>Upload a photo</label>
        <input type='file' name='photoUpload' onChange={event => uploadPhotos(event)} multiple />
        <p>Printed from MyProfileImages-component</p>
        {profile.images.length ?
            profile.images.map(photo => <MyProfileImage photo={photo} key={photo.id} previewImage={modifyPreviewImage} popupState={modifyImagePopupState}/>) :
            <p>You haven't uploaded any images!</p>}
            const [previewImage, modifyPreviewImage] = useState(null);
        {imagePopupState === true ?
            <Popup setPopupState={modifyImagePopupState}><img src={generateImageUrl(previewImage, 'png')} style={popUpImage}/></Popup>
        : ''}

        </>
        );
}

export default MyProfileImages;