import React from 'react';
import styled from 'styled-components';

const Comp = styled.div`
	border: 2px solid;
	border-color: ${(props) => (props.disabled ? 'lightgrey' : '#5a4ba0')};
	border-radius: 5px;
	background: ${(props) => (props.disabled ? 'lightgrey' : 'transparent')};
	transition: all 200ms ease-in-out;

	input {
		display: block;
		position: absolute;
		opacity: 0;
		cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}

	input:checked ~ div {
		background: #5a4ba0;
	}

	div {
		height: 100%;
		color: ${(props) => (props.disabled ? 'grey' : '#5a4ba0')};
		width: 100%;
		padding: 6px 12px;
		font-weight: 600;
		pointer-events: none;
		transition: all 200ms ease-in-out;
	}

	input:checked ~ div {
		color: #fff;
	}
`;

const Checkbox = ({ ...args }) => {
	const { value, setValue, disabled, children } = args;

	return (
		<Comp disabled={disabled}>
			<input
				type='checkbox'
				value={value}
				onClick={() => setValue(!value)}
				disabled={disabled}
			/>
			<div>{children}</div>
		</Comp>
	);
};

export default Checkbox;
