import React from 'react';

const AddButton = (props) => {
	return (
		<button className='add-button' onClick={() => props.onClick(true)}>
			<div></div>
			<div></div>
		</button>
	);
};

export default AddButton;
