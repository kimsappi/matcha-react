import React, {useState} from 'react';

import MyProfileImage from './MyProfileImage';
import {Popup} from '../../components/Popup';

import {uploadPhoto} from '../../modules/httpQueries';
import {generateImageUrl} from '../../modules/httpQueries';

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
                res.then(r => console.log(r));
                
                // MITEN RES:sta SAADAAN PROMISE VALUE ULOS?
                //window.location.reload(false);
    }

    /* eslint-disable eqeqeq */
    const uploadedImages = profile.images.length ?
        profile.images.map(photo => <MyProfileImage photo={photo} key={photo.id} previewImage={modifyPreviewImage} popupState={modifyImagePopupState} main_pic={profile.userData.main_pic} />)
            .sort((a, b) => {
                if (a.key == a.props.main_pic || b.key == b.props.main_pic)
                    return (b.key == b.props.main_pic) - (a.key == a.props.main_pic);
                else
                    return a.key - b.key;
            }) :
        <p>You haven't uploaded any images!</p>;

    return (
        <>
        <label htmlFor='photoUpload'>Upload a photo</label>
        <input type='file' name='photoUpload' onChange={event => uploadPhotos(event)} multiple />
        <p>Printed from MyProfileImages-component</p>
        {uploadedImages}
        {imagePopupState === true ?
            <Popup setPopupState={modifyImagePopupState}><img src={generateImageUrl(previewImage, 'png')} style={popUpImage} alt='Enlarged profile' /></Popup>
        : ''}

        </>
        );
}

export default MyProfileImages;
