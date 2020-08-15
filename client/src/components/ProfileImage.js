import React from 'react';

import {generateImageUrl, fallbackImageUrl} from '../modules/httpQueries';

const ProfileImage = ({filename}) => 
	<img alt='User' src={generateImageUrl(filename)} onError={event => fallbackImageUrl(event)} />
;

export default ProfileImage;
