import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { GlobalContext } from '../../context/GlobalContext';
import MainButton from '../MainButton';
import { Link } from 'react-router-dom';

const Component = styled.div`
	position: absolute;
	width: 100%;
	height: 100%;

	display: ${(props) => (props.open ? 'flex' : 'none')};
	justify-content: center;
	align-items: center;

	background-color: rgba(0, 0, 0, 0.8) !important;
	border-radius: 0 !important;
	z-index: 999;

	.container {
		padding: 2rem;
		background: #fff;
		border-radius: 10px;
		padding: 2rem;

		header {
			text-align: center;
			margin-bottom: 2rem;
		}

		main {
			text-align: center;

			> button:first-of-type {
				margin-right: 1rem;
			}
		}

		form {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			height: 100%;
		}
	}
`;

const LogOutConfirmation = () => {
	const { logOutMenu, handlePanel } = useContext(GlobalContext);

	const handleEvents = (e) => {
		if (e.type === 'keydown') {
			if (e.keyCode === 27) {
				handlePanel('logOutMenu', false);
			}
		}

		if (e.type === 'click') {
			const overlay = document.querySelector('.overlay');

			if (e.target === overlay) {
				handlePanel('logOutMenu', false);
			}
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		handlePanel('logOutMenu', false);
	};

	useEffect(() => {
		document.addEventListener('keydown', handleEvents);
		document.addEventListener('click', handleEvents);

		return () => {
			document.removeEventListener('keydown', handleEvents);
			document.removeEventListener('click', handleEvents);
		};
	}, [logOutMenu]);

	return (
		<Component className='overlay' open={logOutMenu}>
			<div className='container auto-size'>
				<form onSubmit={handleSubmit}>
					<header>
						<h3>Are you sure you want to log out?</h3>
					</header>
					<main>
						<MainButton
							type='button'
							onClick={() => handlePanel('logOutMenu', false)}
							className='btn-transparent'
						>
							Stay In
						</MainButton>
						<Link to='/welcome'>
							<MainButton type='submit' className='btn-negative'>
								Log Out
							</MainButton>
						</Link>
					</main>
				</form>
			</div>
		</Component>
	);
};

export default LogOutConfirmation;
