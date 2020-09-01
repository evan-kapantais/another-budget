import React, { useState, useEffect, useContext } from 'react';
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

	.container {
		width: 100px;
	}

	form {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		height: 100%;

		header,
		main {
			margin-bottom: 4em;
		}

		header {
			display: flex;
			justify-content: space-between;
			align-items: center;
		}
	}

	input {
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

const Savings = () => {
	const {
		savingsMenu,
		setSum,
		handlePanel,
		savings,
		monthlyBalance,
		transactions,
	} = useContext(GlobalContext);

	const [amount, setAmount] = useState(0);
	const [toSavings, setToSavigs] = useState(false);

	const expenses =
		transactions.length > 0
			? transactions
					.map((transaction) => transaction.amount)
					.filter((amount) => amount < 0)
					.reduce((sum, amount) => (sum += amount), 0)
			: 0;

	const income =
		transactions.length > 0
			? transactions
					.map((transaction) => transaction.amount)
					.filter((amount) => amount > 0)
					.reduce((sum, amount) => (sum += amount), 0)
			: 0;

	const balance = monthlyBalance + income + expenses;

	const handleEvents = (e) => {
		if (e.type === 'keydown') {
			if (e.keyCode === 27) {
				handlePanel('savingsMenu', false);
			}
		}

		if (e.type === 'click') {
			const overlay = document.querySelector('.overlay');

			if (e.target === overlay) {
				handlePanel('savingsMenu', false);
			}
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		const numberAmount = Number(amount);

		if (!toSavings) {
			if (numberAmount > savings) {
				alert("You can' transfer this much, mate.");
				setAmount(0);
				return;
			}
			setSum('savings', savings - numberAmount);
			setSum('monthlyBalance', monthlyBalance + numberAmount);
		} else {
			if (numberAmount > balance) {
				alert("You can' transfer this much, mate.");
				setAmount(0);
				return;
			}
			setSum('monthlyBalance', monthlyBalance - numberAmount);
			setSum('savings', savings + numberAmount);
		}

		handlePanel('savingsMenu', false);
	};

	useEffect(() => {
		document.addEventListener('keydown', handleEvents);
		document.addEventListener('click', handleEvents);

		return () => {
			document.removeEventListener('keydown', handleEvents);
			document.removeEventListener('click', handleEvents);
		};
	}, [savingsMenu]);

	return (
		<Component className='overlay' open={savingsMenu}>
			<div className='container'>
				<form onSubmit={handleSubmit}>
					<header>
						<h3>
							Savings{' '}
							<span role='img' arial-label='right-arrow'>
								{toSavings === false ? '→' : '←'}
							</span>{' '}
							Budget
						</h3>
						<button type='button' onClick={() => setToSavigs(!toSavings)}>
							<span arial-label='counter-clockwise-arrows' role='img'>
								🔄
							</span>
						</button>
					</header>
					<main>
						<div className='input-group'>
							<label htmlFor='type'>
								Transfer to{' '}
								<span className='keyword'>
									{toSavings === false ? 'Monthly Budget' : 'Savings'}
								</span>
							</label>
							<input
								type='number'
								step='0.01'
								value={amount}
								onChange={(e) => setAmount(e.target.value)}
							/>
							<p className='input-message'>
								Available {toSavings === false ? 'Savings' : 'Budget'}:{' '}
								{toSavings === false ? savings.toFixed(2) : balance.toFixed(2)}{' '}
								€
							</p>
						</div>
					</main>
					<footer>
						<MainButton type='submit'>Submit</MainButton>
						<MainButton
							type='button'
							onClick={() => handlePanel('savingsMenu', false)}
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

export default Savings;
