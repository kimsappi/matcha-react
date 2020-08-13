import React, {useState} from 'react';

const SingleTag = ({tag, index, tagRemoval}) => {
	return (
		<div>
			#{tag}
			<button  id={'tagRemovalId' + index} onClick={event => tagRemoval(event)}>X</button>
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
				<button onClick={() => {setTags([...tags, newTag]); setNewTag('');}}>+</button>
			</div>
		</>
	);
};

export default TagsInput;
