import React, {useState} from 'react';
import {Button} from 'react-bootstrap';

const SingleTag = ({tag, index, tagRemoval}) => {
	return (
		<div>
			#{tag}
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
		<SingleTag tag={tag} index={index} tagRemoval={tagRemoval} />
	);

	return (
		<>
			{singleTags}
			<label>Add a tag!</label>
			<div class="input-group">
  				#<input type="text" class="form-control" placeholder="" aria-label="" aria-describedby="basic-addon1" value={newTag} onChange={event => setNewTag(event.target.value)} />
				<div class="input-group-append">
					<button class="btn btn-success" type="button" onClick={() => {if (newTag.length) {setTags([...tags, newTag]); setNewTag('');}}}>Add!</button>
				</div>
			</div>
			<br />
		</>
	);
};

export default TagsInput;
