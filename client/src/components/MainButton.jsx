import React, { useContext } from 'react';
import styled from 'styled-components';
import { buttonPulse } from '../helpers/animations';
import themes from '../data/themes';
import { GlobalContext } from '../context/GlobalContext';

const Button = styled.button`
	padding: 0.6rem 1.5rem;
	border-radius: 5px;
	font-size: 0.9rem;
	font-weight: 600;
	color: #fff;
	transition: background 200ms ease;

	&.small {
		font-size: 0.8rem;
		padding: 0.4rem 0.8rem;
		border-radius: 3px;
	}

	&[type='submit'] {
		background: #726a95;

		&:hover,
		&focus {
			animation: ${buttonPulse('#726a95')} 400ms ease-in-out forwards;
		}

		&:active {
			background: #5a4ba0;
		}
	}

	&.btn-negative {
		background: #d9455f;

		&:hover,
		&:focus {
			animation: ${buttonPulse('#d9455f')} 400ms ease-in-out forwards;
		}

		&:active {
			background: #dc2446;
		}
	}

	&.btn-positive {
		background: #2fc4b2;

		&:hover,
		&:focus {
			animation: ${buttonPulse('#2fc4b2')} 400ms ease-in-out forwards;
		}

		&:active {
			background: #269a8c;
		}
	}

	&.btn-default {
		background: #fbc687;

		&:hover,
		&:focus {
			animation: ${buttonPulse('#fbc687')} 400ms ease-in-out forwards;
		}

		&:active {
			background: #ffb458;
		}
	}

	&.btn-transparent {
		color: ${(props) => themes[props.settings.theme].primaryColor};
		background: rgba(255, 255, 255, 0.3);
		mix-blend-mode: difference;

		&:hover,
		&:focus {
			animation: ${buttonPulse('rgba(255, 255, 255, 0.3)')} 400ms ease-in-out
				forwards;
		}

		&:active {
			background: rgba(255, 255, 255, 0.1);
		}
	}

	&[disabled] {
		background: grey;
		cursor: not-allowed;

		&:hover {
			animation: none;
		}
	}
`;

const MainButton = ({ type, children, onClick, className, disabled }) => {
	const { settings } = useContext(GlobalContext);
	return (
		<Button
			settings={settings}
			type={type}
			onClick={onClick}
			className={className}
			disabled={disabled}
		>
			{children}
		</Button>
	);
};

export default MainButton;
