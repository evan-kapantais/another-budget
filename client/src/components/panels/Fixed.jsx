import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { GlobalContext } from '../../context/GlobalContext';
import MainButton from '../MainButton';

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

	form {
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-between;

		header,
		main {
			margin-bottom: 4rem;
		}

		header {
			display: flex;
			justify-content: space-between;
			align-items: center;
		}

		.form-row {
			display: grid;
			grid-template-columns: 1fr 1fr;
			gap: 1rem;
			margin-bottom: 2rem;
			align-items: flex-end;

			&:last-of-type {
				margin-bottom: 0;
			}
		}
	}

	.check-group {
		justify-self: flex-end;

		label {
			margin: 0;
		}
	}

	input[type='checkbox'] {
		margin-right: 0.5rem;
	}

	input[type='number'] {
		position: relative;
		padding: 0.5rem;
		border-radius: 5px;
		border: 1px solid lightgrey;
		width: 100%;
	}

	footer {
		button {
			margin-right: 0.5rem;

			&:last-of-type {
				margin-right: 0;
			}
		}
	}
`;

const Fixed = () => {
	const {
		handlePanel,
		fixedMenu,
		fixedExpenses,
		updateFixedExpenses,
		getFixed,
	} = useContext(GlobalContext);

	useEffect(() => {
		getFixed();
	}, []);

	const [rent, setRent] = useState(fixedExpenses.rent);
	const [power, setPower] = useState(fixedExpenses.power);
	const [water, setWater] = useState(fixedExpenses.water);
	const [telephony, setTelephony] = useState(fixedExpenses.telephony);

	const handleSubmit = (e) => {
		e.preventDefault();
		updateFixedExpenses(rent, power, water, telephony);
		handlePanel('fixedMenu', false);
	};

	const handleEvents = (e) => {
		if (e.type === 'keydown') {
			if (e.keyCode === 27) {
				handlePanel('fixedMenu', false);
			}
		}

		if (e.type === 'click') {
			const overlay = document.querySelector('.overlay');

			if (e.target === overlay) {
				handlePanel('fixedMenu', false);
			}
		}
	};

	useEffect(() => {
		document.addEventListener('keydown', handleEvents);
		document.addEventListener('click', handleEvents);

		return () => {
			document.removeEventListener('keydown', handleEvents);
			document.removeEventListener('click', handleEvents);
		};
	}, [fixedMenu]);

	return (
		<Component className='overlay' open={fixedMenu}>
			<div className='container'>
				<form onSubmit={handleSubmit}>
					<header>
						<h3>Modify Fixed Expenses</h3>
					</header>
					<main>
						<div className='form-row'>
							<div className='input-group'>
								<label>Rent</label>
								<input
									type='number'
									step='0.01'
									value={rent}
									onChange={(e) => setRent(Number(e.target.value))}
								/>
							</div>
							{/* <div className='input-group check-group'>
								<label>
									<input type='checkbox' />
									Projected
								</label>
							</div> */}
						</div>
						<div className='form-row'>
							<div className='input-group'>
								<label htmlFor='type'>Power</label>
								<input
									type='number'
									step='0.01'
									value={power}
									onChange={(e) => setPower(Number(e.target.value))}
								/>
							</div>
						</div>
						<div className='form-row'>
							<div className='input-group'>
								<label>Water</label>
								<input
									type='number'
									step='0.01'
									placeholder='Food, Clothes, Entertainment...'
									value={water}
									onChange={(e) => setWater(Number(e.target.value))}
								/>
							</div>
						</div>
						<div className='form-row'>
							<div className='input-group'>
								<label>Telephony</label>
								<input
									type='number'
									step='0.01'
									value={telephony}
									onChange={(e) => setTelephony(Number(e.target.value))}
								/>
							</div>
						</div>
					</main>
					<footer>
						<MainButton type='submit'>Submit</MainButton>
						<MainButton
							type='button'
							onClick={() => handlePanel('fixedMenu', false)}
							className='btn-negative'
						>
							Cancel
						</MainButton>
					</footer>
				</form>
			</div>
		</Component>
	);
};

export default Fixed;
