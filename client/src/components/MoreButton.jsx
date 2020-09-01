import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import styled from 'styled-components';
import themes from '../data/themes';

const Comp = styled.button`
	display: flex;
	text-align: center;
	color: #fff;
	mix-blend-mode: difference;
	font-size: 0.85rem;
	font-weight: 600;
	height: fit-content;

	p {
		opacity: 0;
		transition: all 300ms ease-in-out;
	}

	&:hover > p {
		opacity: 1;
	}

	&:hover .dot {
		width: 15px;
		border-radius: 0px;
	}

	.dots {
		${(props) => props.padding}: 1rem;
	}

	.dot {
		background: ${(props) => themes[props.settings.theme].secondaryColor};
		width: 3px;
		height: 3px;
		border-radius: 50%;
		margin-bottom: 3px;
		transition: background 500ms 500ms ease-in-out, all 200ms ease-in-out;

		&:last-of-type {
			margin: 0;
		}
	}
`;

const MoreButton = ({ padding, onClick, children }) => {
	const { settings } = useContext(GlobalContext);

	return (
		<Comp padding={padding} settings={settings} onClick={onClick}>
			{padding === 'padding-right' && (
				<>
					<div className='dots'>
						<div className='dot' />
						<div className='dot' />
						<div className='dot' />
					</div>
					{children}
				</>
			)}
			{padding === 'padding-left' && (
				<>
					{children}
					<div className='dots'>
						<div className='dot' />
						<div className='dot' />
						<div className='dot' />
					</div>
				</>
			)}
		</Comp>
	);
};

export default MoreButton;
