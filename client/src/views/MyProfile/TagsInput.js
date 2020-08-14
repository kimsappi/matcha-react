import React, {useState} from 'react';
import {Button} from 'react-bootstrap';

const SingleTag = ({tag, index, tagRemoval}) => {
	return (
		<div style={{display: 'inline'}}>
			&nbsp;&nbsp;&nbsp;&nbsp;#{tag}
			<Button variant="danger" id={'tagRemovalId' + index} onClick={event => tagRemoval(event)}>X</Button> 
		</div>
	);
};


const TagsInput = ({tags, setTags}) => {
	const [newTag, setNewTag] = useState('');

	const tagRemoval = event => {
		setTags(tags.filter((tag, index) => (event.target.id !== 'tagRemovalId' + index)));
	};

	const singleTags = tags.map((tag, index) =>
		<SingleTag tag={tag} index={index} tagRemoval={tagRemoval} key={tag + index} />
	);

	return (
		<>
			{singleTags}
			<br /><label>Add a tag!</label>
			<div className="input-group">
  				<span style={{position: 'relative', left: '20px'}}>#</span>
				<input type="text" className="form-control" placeholder="" aria-label="" aria-describedby="basic-addon1" value={'#' + newTag} onChange={event => setNewTag(event.target.value.replace(/[#+]/g, ''))} />
				<div className="input-group-append">
					<button className="btn btn-success" type="button" onClick={() => {if (newTag.length) {setTags([...tags, newTag]); setNewTag('');}}}>Add!</button>
				</div>
			</div>
			<br />
		</>
	);
};

export default TagsInput;
