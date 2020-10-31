import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';

import themes from '../data/themes';
import { GlobalContext } from '../context/GlobalContext';

const Comp = styled.div`
	position: relative;
	border-radius: 10px;
	box-shadow: ${(props) => themes[props.settings.theme].shadow};
	overflow: hidden;
	background: ${themes.light.image};
	background-attachment: fixed;
	transition: box-shadow 500ms 500ms ease-in-out, background 500ms ease-in-out;

	.master-amount,
	.title {
		mix-blend-mode: difference;
		color: #fff;
	}

	.secondary-text {
		color: ${(props) => themes[props.settings.theme].secondaryColor};
	}

	.dark-overlay {
		position: absolute;
		width: 100%;
		height: 100%;
		bottom: ${(props) => (props.settings.theme === 'dark' ? 0 : '100%')};
		background: ${themes.dark.image};
		background-attachment: fixed;
		border-radius: 10px;
		transition: all 500ms ${(props) => `${props.delay}ms`} ease-in-out;
	}
`;

const Card = ({ children, column, row, id }) => {
	const { settings, getSettings } = useContext(GlobalContext);
	const random = Math.floor(Math.random() * 500);

	useEffect(() => {
		getSettings();
	}, []);

	return (
		<Comp column={column} row={row} delay={random} settings={settings} id={id}>
			<div className='dark-overlay' />
			{children}
		</Comp>
	);
};

export default Card;
