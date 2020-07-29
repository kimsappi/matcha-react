import React from 'react';
import {Button} from 'react-bootstrap';

import {generateImageUrl, photoActions} from '../../modules/httpQueries';

const MyProfileImage = ({photo}) => {
	return (
	<div className="row" id="MyProfilePhoto">
            <img src={generateImageUrl(photo.id, photo.extension)} />
			<Button onClick={() => photoActions('delete', photo.id)}>Delete photo</Button>
			<Button onClick={() => photoActions('primary', photo.id)}>Make photo primary</Button>
    </div>
	);
}

export default MyProfileImage;
