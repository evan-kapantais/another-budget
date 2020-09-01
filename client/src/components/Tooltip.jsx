import React from 'react';
import styled from 'styled-components';

const Comp = styled.div`
	position: absolute;
	left: 10px;
	top: 50%;
	transform: translateY(-50%);
	background: #333;
	color: #fff;
	font-size: 0.9rem;
	padding: 3px 10px;
	border-radius: 3px;

	&:before {
		content: '';
		position: absolute;
		top: 50%;
		left: -6px;
		background: #333;
		width: 10px;
		height: 10px;
		transform: rotate(45deg) translateY(-60%);
	}
`;

const Tooltip = ({ children }) => {
	return (
		<Comp>
			<p>tooltip</p>
		</Comp>
	);
};

export default Tooltip;
