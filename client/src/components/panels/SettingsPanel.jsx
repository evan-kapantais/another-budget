import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { GlobalContext } from '../../context/GlobalContext';

import dark from '../../images/night-sky.jpg';
import light from '../../images/day-sky.jpg';

const Comp = styled.div`
	position: absolute;
	top: 1rem;
	left: ${(props) => (props.open ? 0 : '-25vw')};
	padding: 1rem;
	height: calc(100% - 2rem);
	width: 25vw;
	border-radius: 10px;
	background: #fff;
	opacity: ${(props) => (props.open ? 1 : 0)};
	transition: all 500ms ease-in-out;

	form {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;

		> * {
			width: 100%;
			text-align: center;
		}
	}

	header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	footer {
		display: flex;
		justify-content: space-between;

		nav > .text-button:first-child {
			margin-right: 0.5rem;
		}
	}

	.text-button {
		font-weight: 400;
		text-decoration: underline;
	}

	.action {
		color: lightskyblue;
	}

	#avatar,
	#user-info {
		margin-bottom: 6rem;
	}

	#avatar-container {
		width: 128px;
		height: 128px;
		border-radius: 50%;
		overflow: hidden;
		margin: 0 auto;
		margin-bottom: 1rem;
	}

	#name,
	#email {
		border: none;
		text-align: center;
		padding: 0;
		outline: none;
		border-radius: 0;

		&:focus {
			text-decoration: underline;
		}
	}

	#name {
		font-size: 2.5rem;
		font-weight: 600;
	}

	#email {
		font-weight: lighter;
		font-size: 1.5rem;
	}

	label {
		display: block;
		color: inherit;
		margin: 0;
	}

	.settings-row {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 1.5rem;

		&::last-child {
			margin-bottom: 0;
		}
	}

	.theme-button {
		/* border: 4px solid transparent; */
		border-radius: 10px;
		padding: 2rem 0;

		h2 {
			color: #fff;
			mix-blend-mode: difference;
		}
	}

	.theme-button-dark {
		border-radius: 10px;
		margin-bottom: 1rem;
		background: url(${dark}) no-repeat 0% 80% / cover;
	}

	.theme-button-light {
		background: url(${light}) no-repeat center / cover;
	}

	.theme-button-active {
		border: 5px solid lightskyblue;
	}
`;

const SettingsPanel = () => {
	const {
		settingsMenu,
		handlePanel,
		userDisplayName,
		userEmail,
		settings,
		handleSettingChange,
		setSum,
		devPurge,
		getValue,
		getValues,
	} = useContext(GlobalContext);

	const [name, setName] = useState(userDisplayName);
	const [email, setEmail] = useState(userEmail);

	useEffect(() => {
		getValues('userDisplayName', 'userEmail', 'theme');

		setName(userDisplayName);
		setEmail(userEmail);
	}, [userDisplayName, userEmail]);

	const handleEvents = (e) => {
		if (e.type === 'keydown') {
			if (e.keyCode === 27) {
				handlePanel('settingsMenu', false);
			}
		}
	};

	useEffect(() => {
		document.addEventListener('keydown', handleEvents);

		return () => {
			document.removeEventListener('keydown', handleEvents);
		};
	}, [settingsMenu]);

	const submitForm = (e) => {
		e.preventDefault();

		setSum('userDisplayName', name);
		setSum('userEmail', email);

		handlePanel('settingsMenu', false);
	};

	return (
		<Comp className='panel' open={settingsMenu}>
			<form onSubmit={submitForm}>
				<header>
					<h3>Settings</h3>
					<button
						type='button'
						onClick={() => handlePanel('settingsMenu', false)}
					>
						X
					</button>
				</header>
				<main>
					<section id='avatar'>
						<div id='avatar-container'>
							<img src={require('../../images/85.jpg')} alt='user avatar' />
						</div>
						<button className='action'>Change Profile Image</button>
					</section>
					<section id='user-info'>
						<div className='input-wrapper'>
							<input
								type='text'
								id='name'
								value={name}
								onChange={(e) => setName(e.target.value)}
								onBlur={() => setSum('userDisplayName', name)}
							/>
						</div>
						<div className='input-wrapper'>
							<input
								type='email'
								id='email'
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								onBlur={() => setSum('userEmail', email)}
							/>
						</div>
					</section>
					<section id='settings'>
						<div className='settings-row'>
							<label>Dark Theme</label>
							<input
								type='checkbox'
								checked={settings.theme === 'dark'}
								onChange={() =>
									handleSettingChange(
										'theme',
										settings.theme === 'dark' ? 'light' : 'dark'
									)
								}
							/>
						</div>
					</section>
				</main>
				<footer>
					<nav></nav>
				</footer>
			</form>
		</Comp>
	);
};

export default SettingsPanel;
