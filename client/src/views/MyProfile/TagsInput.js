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
			<div>
				#
				<input type='text' value={newTag} onChange={event => setNewTag(event.target.value)} />
				<Button variant='success' onClick={() => {if (newTag.length) {setTags([...tags, newTag]); setNewTag('');}}}>+</Button>
			</div>
		</>
	);
};

export default TagsInput;
