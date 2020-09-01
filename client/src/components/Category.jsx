import React from 'react';
import styled from 'styled-components';

const colors = {
	groceries: '#7962ce',
	purchases: '#c13d3c',
	food: '#ff8f78',
	drinks: '#3dbce0',
	salary: '#1f8b7e',
	smoking: '#eba337',
};

const lightColors = {
	groceries: '#cec4f4',
	purchases: '#e89c9c',
	food: '#ebc3bb',
	drinks: '#cbe8f0',
	salary: '#aae8e1',
	smoking: '#e1ccac',
};

const Component = styled.div`
	display: flex;
	align-items: center;
	color: ${(props) => colors[props.category]};

	.dot {
		box-sizing: content-box;
		width: 7px;
		height: 7px;
		border-radius: 50%;
		margin-right: 1rem;
		border: 4px solid;
		background: ${(props) => colors[props.category]};
		border-color: ${(props) => lightColors[props.category]};
	}
`;

const Category = ({ category }) => {
	return (
		<Component category={category.toLowerCase()}>
			<div className='dot' />
			{category}
		</Component>
	);
};

export default Category;
