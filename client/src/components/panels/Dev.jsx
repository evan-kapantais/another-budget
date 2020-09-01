import React, { useState } from 'react';
import styled from 'styled-components';

const Comp = styled.div`
	padding: 1rem;
	height: calc(100vh - 4rem);
	width: 25vw;
	border-radius: 20px;
	box-shadow: 0 0 20px lightgrey;

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
`;

const Dev = () => {
	const [name, setName] = useState('Anderson Cooper');
	const [email, setEmail] = useState('a.cooper@gmail.com');

	return (
		<Comp>
			<form>
				<header>
					<h3>Settings</h3>
					<button type='button'>X</button>
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
							/>
						</div>
						<div className='input-wrapper'>
							<input
								type='email'
								id='email'
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>
					</section>
					<section id='settings'>
						<div className='settings-row'>
							<label>Dark Theme</label>
							<input type='checkbox' />
						</div>
						<div className='settings-row'>
							<label>Background Images</label>
							<input type='checkbox' />
						</div>
					</section>
				</main>
				<footer>
					<nav>
						<button type='button' className='text-button'>
							New Month
						</button>
						<button type='button' className='text-button'>
							Log Out
						</button>
					</nav>
					<button type='submit' className='text-button'>
						Save Changes
					</button>
				</footer>
			</form>
		</Comp>
	);
};

export default Dev;
