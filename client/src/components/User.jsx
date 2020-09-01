import React, { useEffect, useContext } from 'react';
import styled from 'styled-components';

import Card from './Card';
import { GlobalContext } from '../context/GlobalContext';
import { getCurrentMonth, getYear } from '../helpers/date';

const Component = styled.div`
	padding: 1rem;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-between;

	header {
		display: flex;
		justify-content: space-between;
		margin-bottom: 2rem;

		.user {
			display: flex;

			img {
				width: 48px;
				height: 48px;
				border-radius: 50%;
				margin-right: 1rem;

				&:hover {
					cursor: pointer;
				}
			}

			.user-info {
				color: #fff;
				mix-blend-mode: difference;

				h2 {
					margin-bottom: 0.2rem;
				}

				p {
					font-size: 0.85rem;
					font-weight: 600;
					color: inherit;
				}
			}
		}

		.date {
			color: rgba(255, 255, 255, 0.8);
			mix-blend-mode: difference;
			font-size: 0.85rem;
			margin-top: 0.3rem;
		}
	}

	.buttons {
		display: flex;
		align-items: center;

		> button {
			margin-right: 0.5rem;
			font-weight: 600;
			color: #fff;
			mix-blend-mode: difference;
		}

		> *::last-of-type {
			margin-right: 0;
		}
	}
`;

const User = () => {
	const {
		userDisplayName,
		userEmail,
		settings,
		handlePanel,
		getValues,
		setSum,
	} = useContext(GlobalContext);

	useEffect(() => {
		getValues('userDisplayName', 'userEmail');
	}, [userDisplayName, userEmail]);

	return (
		<Card row='span 2'>
			<Component settings={settings}>
				<header>
					<div className='user'>
						<img src={require(`../images/85.jpg`)} alt='user avatar' />
						<div className='user-info'>
							<h2>{userDisplayName}</h2>
							<p className='secondary-text'>{userEmail}</p>
						</div>
					</div>
					<h4 className='date'>
						{getCurrentMonth()}, {getYear()}
					</h4>
				</header>
				<footer>
					<div className='buttons'>
						<button
							type='button'
							onClick={() => handlePanel('newMonthMenu', true)}
						>
							New Month
						</button>
						<button type='button' onClick={() => setSum('isNewUser', true)}>
							New User
						</button>
						<button
							type='button'
							onClick={() => handlePanel('settingsMenu', true)}
						>
							Settings
						</button>
					</div>
				</footer>
			</Component>
		</Card>
	);
};

export default User;
