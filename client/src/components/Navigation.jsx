import React, { useContext } from 'react';
import styled from 'styled-components';

import { GlobalContext } from '../context/GlobalContext';

const Component = styled.div`
	grid-column: 1 / -1;
	grid-row: span 1;
	padding: 0.5rem 0;
	display: flex;
	justify-content: space-between;
	align-items: center;

	.user {
		display: flex;

		img {
			width: 52px;
			height: 52px;
			border: 3px solid rgba(0, 0, 0, 0.5);
			border: 3px solid salmon;
			border-radius: 50%;
			margin-right: 1rem;
		}

		.user-info {
			h2 {
				margin-bottom: 0.2rem;
			}

			p {
				font-size: 0.85rem;
				font-weight: 600;
				color: grey;
			}
		}
	}

	li {
		display: inline-block;
		margin: 0 0.5rem;
	}

	.nav-icon {
		width: 20px;
	}
`;

const Navigation = () => {
	const { handleSettingsMenu } = useContext(GlobalContext);

	return (
		<Component>
			<div className='user'>
				<img src={require(`../images/85.jpg`)} alt='user avatar' />
				<div className='user-info'>
					<h2>Evan Kapantais</h2>
					<p>evankapantais@gmail.com</p>
				</div>
			</div>
			<nav>
				<ul>
					<li>
						<button type='button' onClick={() => handleSettingsMenu(true)}>
							<img
								className='nav-icon'
								src={require(`../images/settings.svg`)}
								alt=''
							/>
						</button>
					</li>
					<li>
						<button type='button'>
							<img
								className='nav-icon'
								src={require(`../images/logout.svg`)}
								alt=''
							/>
						</button>
					</li>
				</ul>
			</nav>
		</Component>
	);
};

export default Navigation;
