import React from 'react';
import {Button, Row, Col, Container} from 'react-bootstrap';

import {generateImageUrl, photoActions} from '../../modules/httpQueries';

const MyProfileImage = ({photo, previewImage, popupState}) => {
	return (
	<Container>
		<Row className="justify-content-center" style={{marginBottom: '10px'}}>
			
            	<button onClick={() => {previewImage(photo.id); popupState(true);}}><img alt='Your upload' src={generateImageUrl(photo.id, photo.extension)} style={{maxWidth: '300px', maxHeight: '300px'}}/></button>
			
		</Row>
		<Row className="justify-content-center" style={{marginBottom: '30px'}}>
				<Button className="btn" onClick={() => photoActions('primary', photo.id)} style={{marginRight: '15px'}}>Make photo primary</Button>
				<Button className="btn btn-danger" onClick={() => photoActions('delete', photo.id)}>Delete photo</Button>
		</Row>
    </Container>
	);
}

export default MyProfileImage;
